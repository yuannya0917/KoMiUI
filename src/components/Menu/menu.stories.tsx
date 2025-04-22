import type { Meta, StoryObj } from '@storybook/react';

import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const menu:Meta<typeof Menu>={
    title:'Menu',
    component:Menu,
    subcomponents:{SubMenu,MenuItem},

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
            control:{type:'text'}
        },

        className:{
            control:{type:'text'}
        },

        mode:{
            description:'Menu类型 横向或纵向',
            options:['horizontal','vertical'],
            control:{type:'radio'}
        },

        onSelect:{
            description:'点击菜单项触发的回调函数'
        },
    }
}

export default menu;

type Story=StoryObj<typeof Menu>;

export const Default:Story={
    args:{
        mode:'horizontal'
    },
    render:(args)=>(
        <>
            <Menu {...args}>
                <MenuItem> cool link</MenuItem>
                <MenuItem> cool link2</MenuItem>
                <MenuItem disabled>disabled</MenuItem>
                <SubMenu title='submenu'>
                    <MenuItem>下拉选项1</MenuItem>
                    <MenuItem>下拉选项2</MenuItem>
                    <MenuItem>下拉选项3</MenuItem>
                </SubMenu>
            </Menu>
        </>
    )
}

export const horizontalMenu:Story={
    render:()=>(
        <>
            <Menu mode='horizontal'>
                <MenuItem> cool link</MenuItem>
                <MenuItem> cool link2</MenuItem>
                <MenuItem disabled>disabled</MenuItem>
                <SubMenu title='submenu'>
                    <MenuItem>下拉选项1</MenuItem>
                    <MenuItem>下拉选项2</MenuItem>
                    <MenuItem>下拉选项3</MenuItem>
                </SubMenu>
            </Menu>
        </>
    )
}

export const verticalMenu:Story={
    render:()=>(
        <>
            <Menu mode='vertical'>
                <MenuItem> cool link</MenuItem>
                <MenuItem> cool link2</MenuItem>
                <MenuItem disabled>disabled</MenuItem>
                <SubMenu title='submenu'>
                    <MenuItem>下拉选项1</MenuItem>
                    <MenuItem>下拉选项2</MenuItem>
                    <MenuItem>下拉选项3</MenuItem>
                </SubMenu>
            </Menu>
        </>
    )
}