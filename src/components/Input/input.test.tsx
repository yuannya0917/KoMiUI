import Input,{InputProps} from "./input";
import {render,fireEvent, getByPlaceholderText}from'@testing-library/react'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
const testAppendProps:InputProps={
    size:'lg',
    prepend:'testPrepend',
    append:'testAppend',
    placeholder:'test'
}

const testIconProps:InputProps={
    icon:faCoffee,
    onIconClick:jest.fn()
}

const testDisabledProps:InputProps={
    placeholder:'test',
    icon:faCoffee,
    disabled:true,
    onChange:jest.fn(),
    onIconClick:jest.fn()
}
describe('test Input component',()=>{
    it('should render the correct input',()=>{
        const wrapper=render(<Input {...testAppendProps}></Input>)
        const element=wrapper.getByPlaceholderText("test") as HTMLInputElement

        //元素存在
        expect(element).toBeInTheDocument()
        //是个<input>标签
        expect(element.tagName).toEqual('INPUT')
        //检查class样式
        expect(element).toHaveClass('komi-input-inner')
        expect(element.disabled).toBeFalsy()

        //prepend
        const prepend=wrapper.getByText("testPrepend")
        expect(prepend).toBeInTheDocument()

        //append
        const append=wrapper.getByText("testAppend")
        expect(append).toBeInTheDocument()
    })

    //有icon的时候
    it('should render the correct component with icon',()=>{
        const wrapper=render(<Input {...testIconProps}></Input>)
        const element=wrapper.getByTestId("icon")

        //检查icon被成功渲染
        expect(element).toBeInTheDocument()

        //检查icon类名
        expect(element).toHaveClass('input-icon')

        fireEvent.click(element)
        expect(testIconProps.onIconClick).toHaveBeenCalled()
    })

    it('should render the disabled input',()=>{
        const wrapper=render(<Input {...testDisabledProps}></Input>)
        const element=wrapper.getByPlaceholderText('test') as HTMLInputElement
        const icon=wrapper.getByTestId("icon")

        expect(element).toBeInTheDocument()
        expect(icon).toBeInTheDocument()

        //测试onchange有没有能用上
        expect(element.disabled).toBeTruthy()
        fireEvent.change(element, { target: { value: 'Hello World' } });

        expect(jest.fn()).not.toBeCalled()
        
        //测试icon
        fireEvent.click(icon)
        expect(testDisabledProps.onIconClick).not.toBeCalled()
    })
})