import React ,{InputHTMLAttributes}from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";

type InputSize='lg'|'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'>{
    className?:string;
    disabled?:boolean;
    size?:InputSize;
    icon?:IconProp;
    prepend?:string|React.ReactElement;
    append?:string|React.ReactElement;
    style?:React.CSSProperties;
    onIconClick?:()=>void
}

export const Input:React.FC<InputProps>=({
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    className,
    onIconClick,
    ...restProps
})=>{
    const classes=classNames('komi-input-wrapper',className,{
        [`input-size-${size}`]:size,
        'is-disabled':disabled,
        'input-group':prepend||append,
        'input-group-prepend':prepend,
        'input-group-append':append,
    })

    return(
        <div className={classes} style={style}>
            {prepend&&(<div className="komi-input-group-prepend">{prepend}</div>)}
            {icon&&<div className="icon-wrapper" onClick={disabled?()=>{}:onIconClick}><Icon icon={icon} className="input-icon" data-testid="icon"></Icon></div>}
            <input className="komi-input-inner" disabled={disabled} {...restProps}></input>
            {append&&<div className="komi-input-group-append">{append}</div>}
        </div>
    )
}

export default Input