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