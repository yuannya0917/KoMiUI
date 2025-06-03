import React,{ChangeEvent, ReactElement, KeyboardEvent,useEffect, useState,useRef} from "react";
import Input,{InputProps} from "../Input/input";
import classNames from "classnames";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";

interface DataSourceObject{
    value:string;
}

export type DataSourceType<T={}>=T&DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
    fetchSuggestion:(str:string)=>DataSourceType[]|Promise<DataSourceType[]>
    onSelect?:(item:DataSourceType)=>void
    renderOption?:(item:DataSourceType)=>ReactElement
}

export const AutoComplete:React.FC<AutoCompleteProps>=({
    fetchSuggestion,
    onSelect,
    value,
    renderOption,
    ...restProps
})=>{
    const [inputValue,setInputValue]=useState("")
    const [suggesstions,setSuggestions]=useState<DataSourceType[]>([])
    const [loading,setLoading]=useState(false)
    const [highlightIndex,setHighlightIndex]=useState(-1)
    const nodeRef=useRef(null)
    const triggerSearch=useRef(false)
    const componentRef=useRef<HTMLDivElement>(null)
    const debouncedValue=useDebounce(inputValue,500)

    useClickOutside(componentRef,()=>{setSuggestions([])})
    //Effect依赖于[inputValue]被执行，fetchSuggestion被触发
    useEffect(()=>{
        if(triggerSearch.current&&debouncedValue){
            const result=fetchSuggestion(debouncedValue)
            if(result instanceof Promise){
                console.log('triggered')
                setLoading(true)
                result.then(data=>{
                    setLoading(false)
                    setSuggestions(data)
                })
            }else{
                setSuggestions(result)
            }
            
        }else{
            setSuggestions([])
        }
        setHighlightIndex(-1)
    },[debouncedValue])

    const highlight=(index:number)=>{
        if(index<0)index=0
        if(index>=suggesstions.length){
            index=suggesstions.length-1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown=(e:KeyboardEvent<HTMLElement>)=>{
        switch(e.keyCode){
            
            case 13:
                if(suggesstions[highlightIndex]){
                    handleSelect(suggesstions[highlightIndex])
                }
                break
            case 38:highlight(highlightIndex-1);break
            case 40:highlight(highlightIndex+1);break
            case 27:break;
            default:break
        }
    }
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value.trim()
        setInputValue(value)
        triggerSearch.current=true
    }

    const handleSelect=(item:DataSourceType)=>{
        setInputValue(item.value)
        setSuggestions([])
        if(onSelect){
            onSelect(item)
        }
        triggerSearch.current=false
    }

    const renderTemplete=(item:DataSourceType)=>{
        return renderOption?renderOption(item):item.value
    }
    const genetateDropdown=()=>{
        return(
            <ul ref={nodeRef}>
                {suggesstions.map((item,index)=>{
                    const cnames=classNames('suggestion-item',{
                        'item-highlighted':index===highlightIndex
                    })
                    return(
                        <li key={index} className={cnames} onClick={()=>handleSelect(item)}>
                            {renderTemplete(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }
    return(
        <div className="komi-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}>
            </Input>
            {loading&&<ul className="ul-icon"><Icon icon='spinner' spin className="auto-complete-icon"></Icon></ul>}
            {(suggesstions.length>0)&&genetateDropdown()}
        </div>
    )
}

export default AutoComplete