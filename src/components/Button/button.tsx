import React from "react";
import classNames from "classnames";

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string,
    disabled?: boolean,
    size?: ButtonSize,
    btnType?: ButtonType
    children: React.ReactNode;
    href?: string
}

//把button内置函数相关都合并，使得Button也拥有
type NativeButtonProps=BaseButtonProps&React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps=BaseButtonProps&React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps=Partial<NativeButtonProps&AnchorButtonProps>
const Button: React.FC<ButtonProps> = ({
    btnType = ButtonType.Default,
    className,
    disabled = false,
    size,
    children,
    href,
    ...restProps}) => {
    const classes = classNames('btn', className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })
    if (btnType === ButtonType.Link && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

//已经不用default来写默认值了
// Button.defaultProps={
//     disabled:false,
//     btnType:ButtonType.Default
// }

export default Button