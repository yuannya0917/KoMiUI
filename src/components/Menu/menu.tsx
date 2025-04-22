import React,{createContext,useState} from "react";
import classNames from "classnames";
import {MenuItemProps}from'./menuItem'

type MenuMode='horizontal'|'vertical'
type SelectCallback=(selectedIndex:string)=>void

export interface MenuProps{
    defaultIndex?:string;//默认高亮属性
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties//
    onSelect?:SelectCallback
    children?:React.ReactNode
}

export interface ImenuContext{
    index:string;
    onSelect?:SelectCallback;
    mode?:MenuMode;
}

export const MenuContext=createContext<ImenuContext>({index:'0'})

export const Menu:React.FC<MenuProps>=({
    className,
    mode='horizontal',
    style,
    children,
    defaultIndex='0',
    onSelect
})=>{
    const [currentActive,setActive]=useState(defaultIndex)
    const classes=classNames('komi-menu',className,{
        'menu-vertical':mode==='vertical',
        'menu-horizontal':mode!=='vertical'
    })
    const handleClick=(index:string)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const passedContext:ImenuContext={
        index:currentActive?currentActive:'0',
        //只是传函数引用，并非调用
        onSelect:handleClick,
        mode:mode
    }

    const renderChildren=()=>{
        return React.Children.map((children),(child,index)=>{
            const childElement=child as React.ReactElement<MenuItemProps>
            const displayName = (childElement.type as React.FunctionComponent).displayName;
            if(displayName==='MenuItem'||'SubMenu'){
                return React.cloneElement(childElement,{
                    index:index.toString()
                })
            }else{
                console.error("Warning:Menu has a child which is not a MenuItem component")
            }
        })
    }
    return(
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )

}

export default Menu