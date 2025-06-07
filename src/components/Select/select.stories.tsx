import type { Meta, StoryObj } from '@storybook/react';
import Select from './select';
import Option from './option';

const select:Meta<typeof Select>={
    title:"Select",
    component:Select,
    subcomponents:{Option},
    parameters:{
        docs:{
            story:{
                height:'170px'
            }
        },
        layout:'left'
    },

    argTypes:{
        defaultValue:{
            description:"指定默认选中的条目 可以是是字符串或者字符串数组"
        },

        placeholder:{
            description:"选择框默认文字"
        },

        disabled:{
            description:"是否禁用"
        },

        multiple:{
            description:"是否支持多选"
        },

        onVisibleChange:{
            description:"下拉框出现/隐藏时触发"
        }
    }

}

export default select;

type Story=StoryObj<typeof Select>

export const Default:Story={
    render:()=>(
        <>
            <Select placeholder='点这里选择'>
                <Option value='banana'>香蕉</Option>
                <Option value='watermelon'>西瓜</Option>
                <Option value='strawberry'>草莓</Option>
                <Option value='nihao' disabled>hello</Option>
            </Select>
        </>
    )
}

export const MultipleSelect:Story={
    args:{
        placeholder:"支持多选",
        multiple:true
    },
    render:(args)=>(
        <Select {...args}>
                <Option value='banana'>香蕉</Option>
                <Option value='watermelon'>西瓜</Option>
                <Option value='strawberry'>草莓</Option>
                <Option value='nihao' disabled>hello</Option>
        </Select>
    )
}

export const DisabledSelect:Story={
    args:{
        placeholder:"这个用不了",
        disabled:true,
    },
    render:(args)=>(
        <Select {...args}>
                <Option value='banana'>香蕉</Option>
                <Option value='watermelon'>西瓜</Option>
                <Option value='strawberry'>草莓</Option>
                <Option value='nihao' disabled>hello</Option>
        </Select>
    )
}

 