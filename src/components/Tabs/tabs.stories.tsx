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
            
        },

        className:{

        },

        onSelect:{

        },

        type: {
            options: ['line', 'card'],
            control: { type: 'radio' }
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