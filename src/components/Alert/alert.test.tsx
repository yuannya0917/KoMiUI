import React from "react";
import {render,fireEvent,waitFor}from'@testing-library/react'
import Alert,{AlertType,BaseAlertProps} from "./alert";

const testProps:BaseAlertProps={
    type:'default',
    title:"testAlert",
    description:"testDescription",
    closable:true,
}


const testSuccessAlertProp:BaseAlertProps={
    closable:true,
    type:'success',
    title:"testSuccessAlert"
}

describe('test Alert component',()=>{
    it('should render the correct default Alert', async () => {
        const wrapper = render(<Alert {...testProps}></Alert>);
        const element = wrapper.getByText('testDescription');

        expect(element).toBeInTheDocument();
        if(element){
            expect(element.tagName).toEqual('P');
            expect(element).toHaveClass('alert-message');
            expect(element.parentNode).toHaveClass('alert alert-default');
        }
            

        const titleElement = wrapper.queryByText('testAlert');
            if(titleElement){
                expect(titleElement).toBeInTheDocument();
                expect(titleElement).toHaveClass('alert-title');
                if(titleElement?.parentNode){
                    expect(titleElement.parentNode).toBe(element.parentNode);
                }
                    
            }

        const closeButton = wrapper.queryByText('×');
        if(closeButton){
            fireEvent.click(closeButton);
        }
        await waitFor(() => {
        expect(element).not.toBeInTheDocument();
        });
                
    })

    it('should render the orher type Alert',async()=>{
        const wrapper = render(<Alert {...testSuccessAlertProp}></Alert>);
        const element = wrapper.getByText('testSuccessAlert');

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('H4');
        expect(element).toHaveClass('alert-title');
        expect(element.parentNode).toHaveClass('alert alert-success');

        const closeButton = wrapper.queryByText('×');
        if(closeButton){
            fireEvent.click(closeButton);
        }
        await waitFor(() => {
        expect(element).not.toBeInTheDocument();
        });
    })
})
