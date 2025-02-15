"use client"

import { useState } from "react";



export const useBooleanHead = () => {
    const [value, setValue] = useState(true);
    const toNegative = () => {
        setValue(false);
    }
    const toPositive = () => {
        setValue(true);
    }
    return {
        value,
        toNegative,
        toPositive
    }
}