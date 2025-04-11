import React from "react";
import {render,fireEvent}from'@testing-library/react'
import Button,{ButtonProps,ButtonSize,ButtonType} from './button'
const defaultProps={
    onClick:jest.fn()
}

const testProps:ButtonProps={
    btnType:ButtonType.Primary,
    size:ButtonSize.Large,
    className:'klass'
}

const disabledProps:ButtonProps={
    disabled:true,
    onClick:jest.fn(),
}

describe('test Button component', () => {
    //测试是一个Button 单元测试用例
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        //元素存在
        expect(element).toBeInTheDocument()
        //是个<button>标签
        expect(element.tagName).toEqual('BUTTON')
        //检查class样式
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
        
    })
    //接收到不同props时，是否渲染出正确的元素样式
    it('should render the correct component based on different props',()=>{
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        //按钮成功被渲染
        expect(element).toBeInTheDocument()
        //检查按钮类名
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })
    //行为测试用例，验证Button是否能正确渲染成<a>标签
    it('should render a link when btnType equals link andhref is provided',()=>{
        const wrapper=render(<Button btnType={ButtonType.Link} href="...">Link</Button>)
        const element=wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        //组件渲染为<a>标签
        expect(element.tagName).toEqual('A')
        //className正确
        expect(element).toHaveClass('btn btn-link')
    })
        
    //测试按钮在disabled状态下是否禁止点击行为
    it('should render disabled button when disabled set to true',()=>{
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        //元素存在
        expect(element).toBeInTheDocument()
        //验证disabled属性是否正确挂载到DOM元素上
        expect(element.disabled).toBeTruthy()
        //模拟用户点击这个按钮
        fireEvent.click(element)
        //！重点断言
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})