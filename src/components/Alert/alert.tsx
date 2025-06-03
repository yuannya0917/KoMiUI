import React ,{useRef, useState}from "react";
import classNames from "classnames";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";

export type AlertType='success'|'default'|'danger'|'warning'

export interface BaseAlertProps{
    className?:string,
    title:string,
    description?:string,
    type?:AlertType,
    onClose?:()=>void,
    closable?:boolean,
    children?:React.ReactNode;
}

export const Alert:React.FC<BaseAlertProps>=({
    className,
    title,
    description,
    type='Default',
    onClose=()=>{

    },
    closable=true,
    ...restProps
})=>{
    const nodeRef=useRef(null)
    const classes=classNames('alert',className,{
        [`alert-${type}`]:type
    })

    const[visible,setVisible]=useState(true)
    const handleClick=()=>{
        setVisible(false);
    }

    return(
        <Transition 
        in={visible} 
        animation="zoom-in-top" 
        timeout={300} 
        nodeRef={nodeRef} 
        appear
        unmountOnExit>
            <div className={classes} ref={nodeRef}>
                {title?<h4 className="alert-title">{title}</h4>:null}
                <p className="alert-message">{description}</p>
                {closable?<Icon icon="xmark" onClick={handleClick} className="alert-close" data-testid="alert-close"></Icon>:null}
            </div>
        </Transition>
    )
}

export default Alert