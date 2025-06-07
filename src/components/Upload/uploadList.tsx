import React,{FC} from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";

export interface UploadListProps{
    fileList:UploadFile[];
    onRemove:(_file:UploadFile)=>void
}
export const UploadList: FC<UploadListProps> = ({
    fileList,
    onRemove
}) => {
    return (
        <ul className="komi-upload-list">
            {fileList.map(item => {
                return (
                    <li className="komi-upload-list-item" key={item.uid}>
                        <span className={`file-name file-name-${item.status}`}>
                            <Icon icon="file-alt" theme="secondary"></Icon>
                            {item.name}
                        </span>
                        <span className="file-status">
                            {item.status === "uploading" &&<Icon icon="spinner" spin theme="primary" />}
                            {item.status === "success" &&<Icon icon="check-circle" theme="success" />}
                            {item.status === "error" &&<Icon icon="times-circle" theme="danger" />}
                        </span>
                        <span className="file-actions">
                            <Icon icon='times' onClick={()=>{onRemove(item)}}></Icon>
                        </span>
                        {item.status==="uploading"&&
                            <Progress
                                percent={item.percent||0}
                                theme="primary"
                            ></Progress>
                        }
                    </li>
                )
            })}
        </ul>
    )
}

export default UploadList