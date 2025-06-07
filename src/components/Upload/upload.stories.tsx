import type { Meta, StoryObj } from '@storybook/react';

import { Dragger } from './dragger';
import Upload from './upload';
import UploadList from './uploadList';
import Button from '../Button/button';
import Icon from '../Icon/icon';

const upload:Meta<typeof Upload>={
    title:'Upload',
    component:Upload,
    subcomponents:{Dragger,UploadList},

    argTypes:{
        action:{
            description:"必选参数，上传的地址",
            control: { type: 'text' },
        },

        defaultFileList:{
            description:"上传的文件列表",
            control: { type: 'object' },
        },

        beforeUpload:{
            description:"上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。"
        },

        onProgress:{
            description:"文件上传时的钩子"
        },

        onSucess:{
            description:"文件上传成功时的钩子"
        },

        onError:{
            description:"文件上传失败时的钩子"
        },

        onChange:{
            description:"文件状态改变时的钩子，上传成功或者失败时都会被调用"
        },

        onRemove:{
            description:"文件列表移除文件时的钩子"
        },

        headers:{
            description:"设置上传的请求头部",
            control: { type: 'object' },
        },

        name:{
            description:"上传的文件字段名",
        },
        
        data:{
            description:"上传时附带的额外参数",
            control: { type: 'object' },
        },

        withCredentials:{
            description:"支持发送 cookie 凭证信息"
        },

        accept:{
            description:"可选参数, 接受上传的文件类型"
        },

        multiple:{
            description:"是否支持多选文件"
        },

        drag:{
            description:"是否支持拖拽上传"
        },
    }
}

export default upload;

type Story=StoryObj<typeof Upload>

export const Default:Story={
    render:()=>(
        <Upload action='https://www.mocky.io/v2/5cc8019d300000980a055e76'>
             <Button size="lg" btnType="primary"><Icon icon="upload" /> 点击上传 </Button>
        </Upload>
    )
}

export const CheckBeforeUpload: Story = {
    args: {
        action:'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        beforeUpload: (
            (file: File) => {
                if (Math.round(file.size / 1024) > 50) {
                    alert('file too big')
                    return false;
                }
                return true;
            }
        )
    },

    render:(args)=>(
        <Upload
            {...args}
        >
             <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能上传大于50kb </Button>
        </Upload>
    )
}

export const DragToUpload: Story = {
    args: {
        action:'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        multiple:true,
        drag:true,
        name:'fileName'
    },

    render: (args) => (
        <Upload
            {...args}
        >
            <p>点击或者拖动到此区域进行上传</p>
        </Upload>
    )
}