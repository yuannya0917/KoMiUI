import type { Meta, StoryObj } from '@storybook/react';

import Tabs from './tabs';
import TabItem from './tabsItem';

const tabs:Meta<typeof Tabs>={
    title:'Tabs',
    component:Tabs,
    subcomponents:{TabItem},

    parameters:{
        docs:{
            story:{
                height:'170px'
            }
        },
        layout:'left'
    },

    argTypes:{
        defaultIndex:{
            description:"当前激活 tab 面板的 index，默认为0"
        },

        className:{

        },

        onSelect:{
            description:"点击 Tab 触发的回调函数"
        },

        type: {
            options: ['line', 'card'],
            control: { type: 'radio' },
            description:"Tabs的样式，两种可选，默认为 line"
        },

        style:{

        }
    }
}

export default tabs

type Story=StoryObj<typeof Tabs>

export const Default:Story={
    args:{
        type:'card',
        onSelect:()=>{}
    },

    render:(args)=>(
        <>
            <Tabs {...args}>
                <TabItem label='item1'>This is tab1</TabItem>
                <TabItem label='item2'>This is tab2</TabItem>
                <TabItem label='item3'>This is tab3</TabItem>
            </Tabs>
        </>
    )
}

export const LineTabs:Story={
    render:()=>(
        <>
            <Tabs type='line'>
                <TabItem label='item1'>This is tab1</TabItem>
                <TabItem label='item2'>This is tab2</TabItem>
                <TabItem label='item3'>This is tab3</TabItem>
            </Tabs>
        </>
    )
}

export const CardTabs:Story={
    render:()=>(
        <>
            <Tabs type='card'>
                <TabItem label='item1'>This is tab1</TabItem>
                <TabItem label='item2'>This is tab2</TabItem>
                <TabItem label='item3'>This is tab3</TabItem>
            </Tabs>
        </>
    )
}