import React,{ChangeEvent, FC,useRef,useState} from "react";
import axios from "axios";
import Button from "../Button/button";
import Input from "../Input/input";
import UploadList from "./uploadList";
import { Dragger } from "./dragger";


export type UploadFileStatus='ready'|'uploading'|'success'|'error'
export interface UploadFile{
    uid:string;
    size:number;
    name:string;
    status?:UploadFileStatus;
    percent?:number;
    raw?:File;
    response?:any;
    error?:any;
}

export interface UploadProps{
    action:string,
    defaultFileList?:UploadFile[];
    //上传前是否需要进行检查
    beforeUpload?:(file:File)=>boolean|Promise<File>
    //文件上传进度
    onProgress?:(percentage:number,file:File)=>void,
    //服务器传回
    onSucess?:(data:any,file:File)=>void,
    onError?:(err:any,file:File)=>void,
    onChange?:(file:File)=>void,
    onRemove?:(file:UploadFile)=>void
    headers?:{[key:string]:any};
    name?:string;
    data?:{[key:string]:any};
    withCredentials?:boolean;
    accept?:string;
    multiple?:boolean
    drag?:boolean
    children?:any
}

export const Upload:FC<UploadProps>=({
    action,
    defaultFileList,
    onProgress,
    beforeUpload,
    onSucess,
    onError,
    onChange,
    onRemove,
    name='file',
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
})=>{
    const fileInput=useRef<HTMLInputElement>(null)
    const [fileList,setFileList]=useState<UploadFile[]>(defaultFileList||[])

    const updateFileList=(updateFile:UploadFile,updateObj:Partial<UploadFile>)=>{
        setFileList(prevList=>{
            return prevList.map(file=>{
                if(file.uid===updateFile.uid){
                    return {...file,...updateObj}
                }else{
                    return file
                }
            })
        })
    }

    const handleClick=()=>{
        if(fileInput.current){
            fileInput.current.click()
        }
    }

    const handleFileChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const files=e.target.files
        if(!files){
            return
        }
        UploadFile(files)
        if(fileInput.current){
            fileInput.current.value=''
        }
    }

    const handleRemove=(file:UploadFile)=>{
        setFileList((prevList)=>{
            return prevList.filter(item=>item.uid!==file.uid)
        })
        if(onRemove){
            onRemove(file)
        }
    }

    const UploadFile=(files:FileList)=>{
        let postFiles=Array.from(files)
        postFiles.forEach(file=>{
            if(!beforeUpload){
                post(file)
            }else{
                const result=beforeUpload(file)
                if(result&&result instanceof Promise){
                    result.then(processdFile=>{
                        post(processdFile)
                    })
                }else if(result !==false){
                    post(file)
                }
            }
            
        })
    }

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        //setFileList([_file,...fileList])
        setFileList(preList=>{
            return[_file,...preList]
        })
        const formData = new FormData()
        formData.append(name||'file', file)
        if(data){
            //返回数组里可枚举的键
            Object.keys(data).forEach(key=>{
                formData.append(key,data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = e.total ? Math.round((e.loaded * 100) / e.total) : 0
                if (percentage < 100) {
                    updateFileList(_file,{percent:percentage,status:'uploading'})
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            console.log(resp)
            updateFileList(_file,{status:'success',response:resp.data})
            if (onSucess) {
                onSucess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            console.error(err)
            updateFileList(_file,{status:'error',response:err.data})
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    console.log(fileList)

    return (
        <div className="komi-upload-component">

            <div
                className="komi-upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}
            >
                {drag?
                    <Dragger onFile={(files)=>{UploadFile(files)}}>
                        {children}
                    </Dragger>:
                    children
                }
                <input
                    className="komi-file-input"
                    style={{ display: 'none' }}
                    ref={fileInput}
                    type='file'
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            ></UploadList>
        </div>
    )
}

export default Upload