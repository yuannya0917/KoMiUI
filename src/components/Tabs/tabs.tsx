import React, {createContext,useState}from "react";
import classNames from "classnames";
import TabsItem, { TabItemProps } from "./tabsItem";
import { isDisabled } from "@testing-library/user-event/dist/utils";
type SelectCallback=(selectedIndex:number)=>void
type TabsType='line'|'card'

export interface TabsProps{
    defaultIndex?:number;
    className?:string;
    onSelect?:SelectCallback;
    type?:TabsType;
    style?:React.CSSProperties
    children?:React.ReactNode
}

export interface ItabsContext{
    index:number;
    onSelect?:SelectCallback;
    type?:TabsType
}

export const TabsContext=createContext<ItabsContext>({index:0})
const Tabs:React.FC<TabsProps>=({
    defaultIndex=0,
    className,
    type='line',
    children,
    style,
    onSelect
})=>{
    const [currentActive,setActive]=useState(defaultIndex)
    const classes=classNames('komi-tabs',className,{
        'tabs-line':type==='line',
        'tabs-card':type!=='line'
    })
    const handleClick=(index:number)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext:ItabsContext={
        index:currentActive?currentActive:0,
        type:type,
        onSelect:handleClick,
    }

    const renderChildren=()=>{
        return React.Children.map((children),(child,index)=>{
            const childElement=child as React.ReactElement<TabItemProps>
            const displayName=(childElement.type as React.FunctionComponent).displayName
            if(displayName==='TabItem'){
                return React.cloneElement(childElement,{
                    index:index
                })
            }else{
                console.error("Warning:Tabs has a child which is not a TabItem component")
            }
        })
    }

    //获取当前选中的内容，在renderChildren中已经建立起了一个数组，
    //在这个数组中获得currentActive的子元素，将他的children传出了
    const renderDiv=()=>{
        const current=renderChildren()?.[currentActive];
        if(React.isValidElement(current)){
            return current.props.children
        }
        return null
    }
    return(
        <>
            <div className={classes}>
                <ul className="tabs-ul" style={style}>
                    <TabsContext.Provider value={passedContext}>
                        {renderChildren()}
                    </TabsContext.Provider>
                </ul>
                <div className="tabs-div">{renderDiv()}</div>

            </div>
            
        </>
        
    )

}

export default Tabs