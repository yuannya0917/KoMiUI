import React from 'react'
import { config } from 'react-transition-group';
import { render, cleanup, RenderResult, fireEvent,waitFor } from '@testing-library/react';
import AutoComplete,{DataSourceType,AutoCompleteProps} from './autoComplete';
import test from 'node:test';
import exp from 'node:constants';

config.disabled = true;
const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
]
const testProps: AutoCompleteProps = {
    fetchSuggestion: (query:string) => {return testArray.filter(item=>item.value.includes(query))},
    onSelect: jest.fn(),
    placeholder: 'auto-completed'
}

interface testOptionProps extends DataSourceType{
    number?:number
}
const testProps2: AutoCompleteProps = {
    fetchSuggestion: (query: string) => {return testArray.filter(item=>item.value.includes(query))},
    onSelect: jest.fn(),
    placeholder: 'auto-completed',
    renderOption: (item: DataSourceType) => 
    {   
        const itemWithTest=item as testOptionProps
        return<span>{itemWithTest.value} - {itemWithTest.number}</span>
    }
}

const testProps3:AutoCompleteProps={
    fetchSuggestion:(query) => {
    return Promise.resolve([
      { value: 'async-ab' },
      { value: 'async-abc' }
    ]);
  },
  onSelect: jest.fn(),
  placeholder: 'auto-completed'
}


let wrapper:RenderResult,inputNode:HTMLInputElement
describe('test AutoComplete component',()=>{
    beforeEach(()=>{
        wrapper=render(<AutoComplete {...testProps}></AutoComplete>)
        inputNode=wrapper.getByPlaceholderText('auto-completed') as HTMLInputElement
    })

    it('test basic AutoComplete behavior',async()=>{
        fireEvent.change(inputNode,{target:{value:'a'}})
        await waitFor(()=>{
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
            expect(wrapper.queryByText('abc')).toBeInTheDocument()
            expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2);
            
        })
        
        fireEvent.click(wrapper.getByText('ab'))
        //fill the input
        expect(inputNode.value).toBe('ab')
    })

    it('should provide keyboard support',async()=>{
        fireEvent.change(inputNode,{target:{value:'a'}})
        await waitFor(()=>{
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })

        const firstResult=wrapper.queryByText('ab')
        const secondResult=wrapper.queryByText('abc')

        //arrow down
        fireEvent.keyDown(inputNode,{keyCode:40})
        expect(firstResult).toHaveClass('item-highlighted')

        fireEvent.keyDown(inputNode,{keyCode:40})
        expect(secondResult).toHaveClass('item-highlighted')

        fireEvent.keyDown(inputNode,{keyCode:38})
        expect(firstResult).toHaveClass('item-highlighted')

        //enter
        fireEvent.keyDown(inputNode,{keyCode:13})
        expect(testProps.onSelect).toHaveBeenCalledWith({value:'ab',number:11})
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })

    it('click outside should hide the dropdown',async()=>{
        fireEvent.change(inputNode,{target:{value:'a'}})
        await waitFor(()=>{
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })

        fireEvent.click(document)
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })

    it('renderOption should generate the right templete',async()=>{
        cleanup()
        wrapper=render(<AutoComplete {...testProps2}></AutoComplete>)
        inputNode=wrapper.getByPlaceholderText('auto-completed') as HTMLInputElement
        fireEvent.change(inputNode,{target:{value:'a'}})
        await waitFor(()=>{
            expect(wrapper.queryByText('ab - 11')).toBeInTheDocument()
        })
        expect(wrapper.container.querySelectorAll('.suggestion-item').length)
        .toEqual(2);
    })

    it('async fetchSuggestions should works fine', async() => {
        cleanup()
        wrapper=render(<AutoComplete {...testProps3}></AutoComplete>)
        inputNode=wrapper.getByPlaceholderText('auto-completed') as HTMLInputElement
        fireEvent.change(inputNode,{target:{value:'a'}})
        await waitFor(()=>{
            expect(wrapper.queryByText('async-ab')).toBeInTheDocument()
        })
        expect(wrapper.container.querySelectorAll('.suggestion-item').length)
        .toEqual(2);
    })
})

