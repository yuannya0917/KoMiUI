import React,{SelectHTMLAttributes,createContext,useState,useRef, ReactElement} from "react";
import { IconProps } from "../Icon/icon";
import classNames from "classnames";
import Icon from "../Icon/icon";
import { Input } from "../Input/input";
import {OptionProps } from "./option";
import Transition from "../Transition/transition";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLElement>,'onChange'>{
    className?:string;
    placeholder:string;
    disabled?:boolean;
    multiple?:boolean;
    name?:string;
    children?:React.ReactNode
    onVisibleChange?:(visible:boolean)=>void
}

export interface IselectContext{
    value:string[];
    onSelect?:Function;
    selectedValue?:string[]
    multiple?:boolean
}

export const SelectContext=createContext<IselectContext>({value:[]})
export const Select:React.FC<SelectProps>=({
    className,
    placeholder,
    disabled=false,
    multiple=false,
    name,
    children,
    onVisibleChange,
    ...restProps
})=>{
    const nodeRef=useRef(null)
    const [isOpen,setIseOpen]=useState(false)
    const [currentSelected,setCurrentSelected]=useState<string[]>([])
    const classes=classNames('komi-select',className,{
        'is-disabled':disabled,
        'is-multiple':multiple,
        'is-open':isOpen
    })

    const handleInputClick=()=>{
        if(!disabled){
            setIseOpen(!isOpen)
        }
    }

    // const passedContext: IselectContext = {
    //     index: currentSelected ? currentSelected : '0'
    // }
    const handleSelect=(value:string)=>{
        if(multiple){
            //当被选择数组中有该value 且被点击时 应该取消选中
            if(currentSelected.includes(value)){
                setCurrentSelected(currentSelected.filter(item=>item!==value))
            }else{
            //如果没有 就加入
                setCurrentSelected([...currentSelected,value])
            }
        }else{
            setCurrentSelected([value])
        }
        console.log(currentSelected)
    }

    const passedContext:IselectContext={
        value:currentSelected?currentSelected:[],
        onSelect:handleSelect,
        selectedValue:currentSelected,
    }

    const renderOptions=()=>{
        if(!isOpen)return null
        return React.Children.map((children),(child,index)=>{
            const childElement=child as React.ReactElement<OptionProps>
            const displayName = (childElement.type as React.FunctionComponent).displayName;
            if(displayName==='Option'){
                const value=childElement.props.value
                const isSelected=currentSelected.includes(value)
                return React.cloneElement(childElement,{
                    index:index.toString(),
                    isSelected:isSelected
                })
            }else{
                console.error("Warning:Select has a child which is not a Option component")
            }
        })
        
    }

    const renderCurrentText=()=>{
        const optionsArray=React.Children.toArray(children)
        .filter(React.isValidElement).map(child=>child as React.ReactElement<OptionProps>)
        if(!currentSelected||currentSelected.length===0){
            return "请选择"
        }else{
            return  currentSelected.map(value=>{
                const option=optionsArray.find(opt=>opt.props.value===value)
                return option?.props.children?.toString()
            }).join(' ')
        }
        
    }

    return(
        <div className={classes}>
            <Input placeholder={currentSelected.length===0?placeholder:renderCurrentText() }
                    data-testid="test-select"
                   onClick={handleInputClick}
                   className="komi-select-input" 
                   onIconClick={handleInputClick}
                   icon="angle-down"
                   readOnly></Input>
                <Transition
                in={isOpen}
                timeout={300}
                classNames="zoom-in-top"
                appear
                nodeRef={nodeRef}
                unmountOnExit
            >
                    <ul  className="select-ul" ref={nodeRef} data-testid="select-ul">
                        <SelectContext.Provider value={passedContext}>
                            {renderOptions()}
                        </SelectContext.Provider>
                    </ul>

            </Transition>
        </div>
    )
}

export default Select