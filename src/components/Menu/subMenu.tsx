import React,{Children, ReactNode, useContext,useState} from "react";
import classNames from "classnames";
import {MenuContext} from'./menu'
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps{
    index?:string;
    title:string;
    className?:string;
    children?:React.ReactNode
}

const SubMenu:React.FC<SubMenuProps>=({index,title,className,children})=>{
    const[menuOpen,setOpen]=useState(false);
    const context=useContext(MenuContext)
    const classes=classNames('menu-item submenu-item',className,{
        'is-active':context.index===index
    })
    const handleClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        setOpen(!menuOpen)
    }

    let timer:any
    const handleMouse=(e:React.MouseEvent,toggle:boolean)=>{
        clearTimeout(timer);
        e.preventDefault();
        timer=setTimeout(()=>{
            setOpen(toggle)
        },300)
    }

    const hoverEvents=context.mode!=='vertical'?{
        onMouseEnter:(e:React.MouseEvent)=>{handleMouse(e,true)},
        onMouseLeave:(e:React.MouseEvent)=>{handleMouse(e,false)}
    }:{}
    const renderChildren=()=>{
        const subMenuClasses=classNames('komi-submenu',{
            'menu-opened':menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.ReactElement<MenuItemProps>
            const displayName = (childElement.type as React.FunctionComponent).displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement,{index:`${index}-${i}`})
            } else {
                console.error("Warning:SubMenu has a child which is not a MenuItem")
            }
        })
        return(
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" onClick={handleClick}>{title}</div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName='subMenu'
export default SubMenu