import React from "react";
import CSSTransition from "react-transition-group/CSSTransition"
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import classNames from "classnames";

type AnimationName='zoom-in-top'|'zoom-in-left'|'zoom-in-bottom'|'zoom-in-right'

export type TransitionProps<Ref extends undefined | HTMLElement = undefined>
  = CSSTransitionProps<Ref> & {
  animation?: AnimationName,
  wrapper?: boolean // 添加一层dom, 避免transition冲突
}

const Transition: React.FC<TransitionProps> = ({
    children, 
    animation='zoom-in-top', 
    wrapper=false, 
    className:clsNames, 
    unmountOnExit = true,
    appear = true,
    ...restProps
}) => {
   const classes = classNames(animation, clsNames)
  //先判断children是否是函数
  const renderContent=()=>{
    if(typeof children ==='function'){
        return children
    }else{
        return wrapper? <div>{children}</div>:children
    }
  }

  return (
    <CSSTransition classNames={classes} {...restProps}>
      {renderContent()}
    </CSSTransition>
  );
}



export default Transition;