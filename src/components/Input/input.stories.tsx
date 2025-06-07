import type { Meta, StoryObj } from '@storybook/react';
import Input from './input'; 

const input:Meta<typeof Input>={
    title:'Input',
    component:Input,
    parameters:{
        docs:{
            story:{
                height:'170px'
            }
        },
        layout:'left'
    },

    argTypes:{
        disabled:{
            description:"是否禁用 Input"
        },

        size:{
            description:"设置input大小，支持lg，sm"
        },

        icon:{
            description:"添加图标，在右侧悬浮添加一个图标，用于提示"
        },

        prepend:{
            description:"添加前缀 用于配置一些固定组合"
        },

        append:{
            description:"添加后缀 用于配置一些固定组合"
        },

        onIconClick:{
            description:"有图标时，点击图标后执行的函数"
        }
        
    }
}

export default input;

type Story=StoryObj<typeof Input>;

export const Default:Story={
    args:{
        placeholder:'这是一个input'
    }
}

export const DisabledInput:Story={
    args:{
        disabled:true
    },
    render:(args)=>(
        <>
            <Input placeholder='disabled input' {...args}></Input>
        </>
    )
}

export const InputWithIcon:Story={
    args:{
        icon:'magnifying-glass'
    },
    render:(args)=>(
        <>
            <Input placeholder='InputWithIcon' {...args}></Input>
        </>
    )
}

export const DifferentSizeInput:Story={
    render:(args)=>(
        <>
            <Input placeholder='large size' size='lg' {...args}></Input>
            <Input placeholder='small size' size='sm' {...args}></Input>
        </>
    )
}

export const AppendAndPreppendInput:Story={
    render:(args)=>(
        <>
            <Input placeholder='google' append='.com' size='lg' {...args}></Input>
            <Input placeholder='prepend text' prepend='https://' size='lg' {...args}></Input>
        </>
    )
}