import React from "react";
import { fireEvent,getByText,render,RenderResult, queryByText, cleanup} from "@testing-library/react";

import Tabs,{TabsProps} from "./tabs";
import TabItem from "./tabsItem";

const testProps:TabsProps={
    defaultIndex:0,
    onSelect:jest.fn(),
    className:'test'
}

const testVerProps:TabsProps={
    defaultIndex:0,
    type:'card'
}

const generateTab=(props:TabsProps)=>{
    return(
        <Tabs {...props}>
            <TabItem label="activeTest">
                active
            </TabItem>
            <TabItem label="disabledTest" disabled>
                disabled
            </TabItem>
            <TabItem label="test3">xyz</TabItem>
        </Tabs>
    )
}

let wrapper:RenderResult,tabsElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe('test Tabs and TabItem',()=>{
    beforeEach(()=>{
        wrapper=render(generateTab(testProps))
        tabsElement=wrapper.getByTestId('tabs-test')
        activeElement=wrapper.getByText('activeTest')
        disabledElement=wrapper.getByText('disabledTest')
    })

    it( 'should render correct Tabs and tabItem based on default props',()=>{
        expect(tabsElement).toBeInTheDocument();
        expect(tabsElement).toHaveClass('komi-tabs test')
        expect(tabsElement.querySelectorAll('ul>li').length).toEqual(3)
        expect(activeElement).toHaveClass('tabs-item is-active')
        expect(disabledElement).toHaveClass('tabs-item is-disabled')
        const divElement=wrapper.getByText('active')
        expect(divElement).toBeInTheDocument()
    })
    it('click items should change active and call the right callback',()=>{
        const thirdItem=wrapper.getByText('test3')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
        //重新渲染检查div
        wrapper.rerender(generateTab(testProps))
        //检查已经渲染出xyz 没有渲染出active
        const divElement=wrapper.getByText('xyz')
        expect(divElement).toBeInTheDocument()
        expect(queryByText(divElement,'active')).not.toBeInTheDocument();
        //检查disabled时的情况
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
        const divElement2=wrapper.getByText('xyz')
        expect(divElement2).toBeInTheDocument()
        expect(queryByText(divElement2,'disabled')).not.toBeInTheDocument();
    })

    it('should render card type when type is set to card',()=>{
        cleanup()
        const wrapper=render(generateTab(testVerProps))
        const tabsElement=wrapper.getByTestId('tabs-test')
        expect(tabsElement).toHaveClass('komi-tabs tabs-card')
    })

})
