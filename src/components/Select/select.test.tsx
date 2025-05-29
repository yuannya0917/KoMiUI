import Select,{SelectProps} from "./select";
import Option,{OptionProps} from "./option";
import { RenderResult,cleanup,fireEvent,render, waitFor } from "@testing-library/react";

const testSingleProps:SelectProps={
    placeholder:"singleTest"
}

const testDisabledProps:SelectProps={
    placeholder:'disabledSelectTest',
    disabled:true
    
}

const testMultipleProps:SelectProps={
    placeholder:"multipleTest",
    multiple:true

}

const generateSelect=(props:SelectProps)=>{
    return(
        <Select {...props}>
            <Option value="1">test1</Option>
            <Option value="2">test2</Option>
            <Option value="3">test3</Option>
            <Option value="4" disabled>disabled</Option>
        </Select>
    )
}

let wrapper:RenderResult,inputElement:HTMLElement,activeElement1:HTMLElement,
            activeElement2:HTMLElement, activeElement3:HTMLElement,
            disabledElement:HTMLElement
describe('test Select and Option component', () => {
    beforeEach(() => {
        wrapper = render(generateSelect(testSingleProps));
        inputElement = wrapper.getByTestId("test-select");
    });

    it('should render correct Select Input based on default Props', () => {
        //检查input有没有被选入
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveClass('komi-input-inner')

        //检查option是否被渲染 初始应该没有被渲染
        const activeElement = wrapper.queryByText("test1")
        expect(activeElement).not.toBeInTheDocument()
    });

    it('should render correct option based on default Props', () => {
        fireEvent.click(inputElement)

        const ulSelect = wrapper.getByTestId("select-ul")
        const disabledElement=wrapper.getByText('disabled').parentElement

        //检查ul有没有正确渲染
        expect(ulSelect).toBeInTheDocument()
        expect(ulSelect).toHaveClass("select-ul")
        expect(ulSelect.querySelectorAll(':scope>li').length).toEqual(4)
        expect(disabledElement).toHaveClass('komi-option is-disabled')
    });

    it('click option should change active and call the right callback',()=>{
        fireEvent.click(inputElement)
        activeElement1=wrapper.getByText('test1')
        activeElement2=wrapper.getByText('test2')
        disabledElement=wrapper.getByText('disabled')
        
        fireEvent.click(activeElement1)
        waitFor(()=>{
            expect(activeElement1.parentElement).toHaveClass('is-selected')
        })
        
        fireEvent.click(activeElement2)
        waitFor(()=>{
            expect(activeElement2.parentElement).toHaveClass('is-selected')
            expect(activeElement1.parentElement).not.toHaveClass('is-selected')
        })
        

        fireEvent.click(disabledElement)
        waitFor(()=>{
            expect(disabledElement.parentElement).not.toHaveClass('is-selected')
            expect(disabledElement.parentElement).toHaveClass('is-disabaled')
        })
        
    })

    it('can save selected option after open select again',()=>{
        fireEvent.click(inputElement)
        activeElement1=wrapper.getByText('test1')

        fireEvent.click(inputElement)
        fireEvent.click(inputElement)
        activeElement1=wrapper.getByText('test1')
        waitFor(()=>{
            expect(activeElement1.parentElement).toHaveClass('is-selected')
        })
        
    })

    it('test disabled select not can be click',()=>{
        cleanup()
        wrapper=render(generateSelect(testDisabledProps))
        inputElement=wrapper.getByPlaceholderText('disabledSelectTest')

        fireEvent.click(inputElement)
        expect(wrapper.queryByTestId('select-ul')).not.toBeInTheDocument()
    })

    it('test multiple select can change active and call the right callback',()=>{
        cleanup()
        wrapper=render(generateSelect(testMultipleProps))
        inputElement=wrapper.getByPlaceholderText('multipleTest')

        fireEvent.click(inputElement)
        activeElement1=wrapper.getByText('test1')
        activeElement2=wrapper.getByText('test2')
        activeElement3=wrapper.getByText('test3')

        fireEvent.click(activeElement1)
        expect(activeElement1.parentElement).toHaveClass('is-selected')
        fireEvent.click(activeElement2)
        expect(activeElement2.parentElement).toHaveClass('is-selected')
        expect(activeElement1.parentElement).toHaveClass('is-selected')

    })
})