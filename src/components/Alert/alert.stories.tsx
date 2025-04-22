import type { Meta, StoryObj } from '@storybook/react';

import Alert from './alert';

const alert:Meta<typeof Alert>={
    title:'Alert',
    component:Alert,
    argTypes:{
        title:{
            description:'标题'
        },

        description:{
            description:'描述'
        },

        type:{
          options:['success','danger','default','warning'], 
          description:'类型 四种可选 针对不同的场景'  
        },

        onClose:{
            description:'关闭时触发的事件'
        },

        closable:{
            description:'是否显示关闭键'
        }
    }
}

export default alert;
type Story=StoryObj<typeof Alert>

export const Default:Story={
    args:{
        title:'Alert',
        description:''
    }
}

export const DiffrentAlertType:Story={
    render:()=>(
        <>
        <Alert title='this is Success' type='success'></Alert>
        <Alert title='this is Default' type='default'></Alert>
        <Alert title='this is Danger' type='danger'></Alert>
        <Alert title='this is Warning' type='warning'></Alert>
        </>
    )
}

export const AlertWithDescription:Story={
    render:()=>(
        <Alert title='this is Alert' description='description'></Alert>
    )
}