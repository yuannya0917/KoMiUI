import React,{useContext} from "react";
import classNames from "classnames";
import { TabsContext, TabsProps } from "./tabs";

export interface TabItemProps{
    className?:string
    index?:number
    label:string,
    disabled?:boolean,
    style?:React.CSSProperties
    children?:React.ReactNode
}

const TabItem:React.FC<TabItemProps>=({
    className,
    index,
    label,
    disabled=false,
    style,
    children
})=>{
    const context=useContext(TabsContext)
    const classes=classNames('tabs-item',{className},{
        'is-disabled':disabled,
        'is-active':context.index===index
    })
    const handleClick=()=>{
        if(context.onSelect&&!disabled&&(typeof index==='number')){
            context.onSelect(index)
        }
    }
    return(
        <li className={classes} style={style} onClick={handleClick} >{label}</li>
    )
}

TabItem.displayName='TabItem'
export default TabItem