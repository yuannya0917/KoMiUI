import React, { useContext,useRef, useState } from "react";
import { OptionHTMLAttributes } from "react";
import { SelectContext } from "./select";
import classNames from "classnames";
import Icon from "../Icon/icon";

export interface OptionProps extends OptionHTMLAttributes<HTMLElement>{
    disabled?:boolean,
    label?:string,
    index?:string,
    value:string,
    className?:string,
    isSelected?:boolean
}
export const Option:React.FC<OptionProps>=({
    disabled,
    label,
    index,
    value,
    children,
    className,
    isSelected,
    ...restProps
})=>{
    const context=useContext(SelectContext);
    const classes=classNames('komi-option',className,{
        'is-disabled':disabled,
        'is-selected':isSelected
    }
    )

    const handleClick=()=>{
        if(context&&!disabled&&context.onSelect){
                context.onSelect(value);
        }
    }
    return (
        <li onClick={handleClick} className={classes}>
            <div className="option-text" >
                {children}
            </div>
            
            {isSelected?(<Icon icon="check" className="option-close-icon"></Icon>):null}
        </li>
    )
}

Option.displayName='Option';
export default Option