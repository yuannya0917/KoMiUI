import React from "react";
import classNames from "classnames";
import {fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

export type ThemeProps='primary'|'secondary'|'success'|'info'|'warning'|'danger'|'light'|'dark'

export interface IconProps extends FontAwesomeIconProps{
    theme?:ThemeProps
}

const Icon:React.FC<IconProps>=({
    className,
    theme,
    ...restProps
})=>{
    //icon-primary
    const classes=classNames('komi-icon',className,{
        [`icon-${theme}`]:theme
    })
    return(
        <FontAwesomeIcon className={classes}{...restProps}></FontAwesomeIcon>
    )
}
export default Icon