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