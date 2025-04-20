import React from "react";
import CSSTransition from "react-transition-group/CSSTransition"
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import classNames from "classnames";

type AnimationName='zoom-in-top'|'zoom-in-left'|'zoom-in-bottom'|'zoom-in-right'

export type TransitionProps<Ref extends undefined | HTMLElement = undefined>
  = CSSTransitionProps<Ref> & {
    animation?: AnimationName,
  }


const Transition: React.FC<TransitionProps> = ({
    children, 
    animation='zoom-in-top', 
    className:clsNames, 
    unmountOnExit = true,
    appear = true,
    ...restProps
}) => {
   const classes = classNames(animation, clsNames)

  return (
    <CSSTransition classNames={classes}  unmountOnExit={unmountOnExit} {...restProps}>
        {children}
    </CSSTransition>
  );
}



export default Transition;