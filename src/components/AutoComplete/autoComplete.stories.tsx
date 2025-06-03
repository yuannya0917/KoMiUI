import type { Meta, StoryObj } from '@storybook/react';

import  AutoComplete from './autoComplete';

const autoComplete:Meta<typeof AutoComplete>={
    title:'AutoComplete',
    component:AutoComplete,
}

export default autoComplete;
type Story=StoryObj<typeof AutoComplete>

export const Default:Story={
    
}