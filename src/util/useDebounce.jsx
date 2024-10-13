import { useEffect, useState } from "react";

export default function useDebounce(inputValue, timeDelay){
    const [value,setValue]=useState(inputValue)
    useEffect(()=>{
        const idHandel= setTimeout(() => {
            setValue(inputValue)
        }, timeDelay);
        return ()=>{
            clearTimeout(idHandel)
        }
    },[inputValue,timeDelay])
    return value;
}