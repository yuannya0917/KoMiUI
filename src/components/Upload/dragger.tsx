import React,{FC,useState,DragEvent, ReactElement} from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";

interface DraggerProps{
    onFile:(files:FileList)=>void;
    children?:any
}
export const Dragger:FC<DraggerProps>=({
    onFile,
    children
})=>{
    const [dragOver,setDragOver]=useState(false)
    const klass=classNames('komi-uploader-dragger',{
        'is-dragover':dragOver
    })
    const handleDrag=(e:DragEvent<HTMLElement>,over:boolean)=>{
        e.preventDefault()
        setDragOver(over)
    }

    const handleDrop=(e:DragEvent<HTMLElement>)=>{
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }
    return(
        <div
            className={klass}
            onDragOver={e=>{handleDrag(e,true)}}
            onDragLeave={e=>{handleDrag(e,false)}}
            onDrop={handleDrop}
        >
            <Icon icon="upload" ></Icon>
            <div className="dragger-text">
                {children}
            </div>
            
        </div>
    )
}