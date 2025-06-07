import type { Meta, StoryObj } from '@storybook/react';

import AutoComplete, { DataSourceType } from './autoComplete';

const testArray = [
  { value: "南京大学", city: "南京" },
  { value: "东南大学", city: "南京" },
  { value: "南京理工大学", city: "南京" },
  { value: "苏州大学", city: "苏州" },
  { value: "江南大学", city: "无锡" },
  { value: "中国矿业大学", city: "徐州" },
  { value: "南京航空航天大学", city: "南京" },
  { value: "南京农业大学", city: "南京" },
  { value: "南京师范大学", city: "南京" },
  { value: "扬州大学", city: "扬州" },
  { value: "常州大学", city: "常州" },
  { value: "淮阴工学院", city: "淮安" },
  { value: "盐城工学院", city: "盐城" },
  { value: "南京工业大学", city: "南京" },
  { value: "南京医科大学", city: "南京" }
];

interface GithubUserProps{
    login?:string;
    url?:string;
    avatar_url:string
  }


interface JSUniversityProps{
    value:string,
    city?:string
}

const autoComplete:Meta<typeof AutoComplete>={
    title:'AutoComplete',
    component:AutoComplete,
    parameters:{
        docs:{
            story:{
                height:'200px'
            }
        },
        layout:'center'
    },

    argTypes:{
        fetchSuggestion:{
            description:"返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise type DataSourceType = T & DataSourceObject"
        },

        onSelect:{
            description:"点击选中建议项时触发的回调"
        },

        onChange:{
            description:"文本框发生改变的时候触发的事件"
        },

        renderOption:{
            description:"支持自定义渲染下拉项，返回 ReactElement"
        },

        size:{
            description:"设置 input 大小，支持 lg 或者是 sm"
        },

        disabled:{
            description:"是否禁用 Input"
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
            description:"有icon时点击后执行的函数"
        }
    }
}

export default autoComplete;

type Story = StoryObj<typeof AutoComplete>
export const Default: Story = {
    args: {
        fetchSuggestion: (query: string) => { return testArray.filter(item => item.value.includes(query)) }
    },

    render: (args) => {
        return (
            <>
                <AutoComplete {...args} />
            </> 
        )
    }
}

export const CustomSearch:Story={

    args: {
        fetchSuggestion: (query: string) => { return testArray.filter(item => item.value.includes(query)) },
        placeholder:"输入江苏大学的名称，自定义下拉模板",
        renderOption:(
            (item:DataSourceType)=>{
                const itemWithCity= item as DataSourceType<JSUniversityProps>
                return(
                    <div style={{display:'flex'}}>
                        <b style={{ marginRight: '20px'  }}>学校名称：{itemWithCity.value}</b>
                        <span>所属城市：{itemWithCity.city}</span>
                    </div>
                )
            }
        )
    },
    render:(args)=>{
        return(
            <>
                <AutoComplete {...args}></AutoComplete>
            </>
        )
    }
}

export const AsynchronousSearch:Story={
    args: {
        fetchSuggestion: (
            (query: string) => {
                return fetch(`https://api.github.com/search/users?q=${query}`)
                    .then(res => res.json())
                    .then(({ items }) => {
                        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
                    })
            }
        ),
        placeholder: "输入Github用户名",
        renderOption: (
            (item: DataSourceType) => {
                const itemWithGithub = item as DataSourceType<GithubUserProps>
                return (
                  <>
                    <b style={{ marginRight: '20px'  }}>Name: {itemWithGithub.value}</b>
                    <span>url: {itemWithGithub.url}</span>
                  </>
                )
              }
        )
    },
    render: (args) => {
        return (
            <>
                <AutoComplete {...args}></AutoComplete>
            </>
        )
    }
}