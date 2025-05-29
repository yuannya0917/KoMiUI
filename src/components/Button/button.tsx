import React ,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes}from "react";
import classNames from "classnames";

export type ButtonSize='lg'|'sm'

export type ButtonType='primary'|'default'|'danger'|'link'

interface BaseButtonProps {
    className?: string,
    disabled?: boolean,
    size?: ButtonSize,
    btnType?: ButtonType
    children: React.ReactNode;
    href?: string
}

//把button内置函数相关都合并，使得Button也拥有
type NativeButtonProps=BaseButtonProps&ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps=BaseButtonProps&AnchorHTMLAttributes<HTMLElement>
export type ButtonProps=Partial<NativeButtonProps&AnchorButtonProps>
export const Button: FC<ButtonProps> = ({
    btnType = 'default',
    className,
    disabled = false,
    size,
    children,
    href,
    ...restProps}) => {
    const classes = classNames('btn', className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType === 'link' && href) {
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