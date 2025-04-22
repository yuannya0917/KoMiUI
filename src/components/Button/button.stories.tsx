import type { Meta, StoryObj } from '@storybook/react';

import Button from './button';
 
const button: Meta<typeof Button> = {
  title:'Button',
  component: Button,
  argTypes: {
    size: {
      options: ['lg', 'sm'],
      control: { type: 'radio' },
      description:'设置Button的大小'
    },

    btnType:{
      options:['primary','default','danger','link'],
      control:{type:'radio'},
      description:'设置Button的类型'
      
    },
    
    className:{
      control:{type:'text'}
    },

    disabled:{
      control:{type:'boolean'},
      description:'设置Button的禁用'
    },

    href:{
      control:{type:'text'},
    }

  },
};
 
export default button;
type Story = StoryObj<typeof Button>;

export const Default:Story= {
  args: {
    children:'Default Button'
  }
};

export const DifferentButtonSize: Story = {
  render: () => (
    <>
      <Button size='lg'>LargeButton</Button>
      <Button size='sm'>SmallButton</Button>
    </>
  )
}

export const DifferentButtonType: Story = {
  render: () => (
    <>
      <Button btnType='primary'>PrimaryButton</Button>
      <Button btnType='danger'>DangerButton</Button>
      <Button btnType='default'>DefaultButton</Button>
      <Button btnType='link'>LinkButton</Button>
    </>
  )

}