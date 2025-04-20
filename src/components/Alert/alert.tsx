import React ,{useRef, useState}from "react";
import classNames from "classnames";
import Transition from "../Transition/transition";

export enum AlertType{
    Success='success',
    Default='default',
    Danger='danger',
    Warning='warning'
}

export interface BaseAlertProps{
    className?:string,
    title?:string,
    description?:string,
    type?:AlertType,
    onClose?:()=>void,
    closable?:boolean,
    children?:React.ReactNode;
}

const Alert:React.FC<BaseAlertProps>=({
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
                {closable?<button className="close" onClick={handleClick}>×</button>:null}
            </div>
        </Transition>
    )
}

export default Alert