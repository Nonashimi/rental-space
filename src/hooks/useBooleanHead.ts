"use client"

import { useTypeStore } from "@/store/search-type";
import { useEffect, useState } from "react";



export const useBooleanHead = () => {
    const [value, setValue] = useState(true);
    const type = useTypeStore();
    const toNegative = () => {
        setValue(false);
        console.log('negative');
    }
    const toPositive = () => {
        setValue(true);
        console.log('positive');
    }

    useEffect(() => {
        if(!type.isFocus){
            toPositive();
        }else{
            toNegative();
        }
    },[type.isFocus]);



    return {
        value,
        toNegative,
        toPositive
    }
}