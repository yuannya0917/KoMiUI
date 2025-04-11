import React ,{useState}from "react";
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
    const classes=classNames('alert',className,{
        [`alert-${type}`]:type
    })

    const[visible,setVisible]=useState(true)
    const handleClick=()=>{
        setVisible(false);
    }

    if(!visible) return null;
    return(
        <Transition in={visible} animation="zoom-in-left" timeout={300} wrapper={true}>
            <div className={classes}>
                {title?<h4 className="alert-title">{title}</h4>:null}
                <p className="alert-message">{description}</p>
                {closable?<button className="close" onClick={()=>{handleClick()}}>×</button>:null}
            </div>
        </Transition>
    )
}

export default Alert