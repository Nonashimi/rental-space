"use client"

import { useState } from "react"


export const useModal = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const clickOpen = () => {
        setIsOpen(true);
    }

    const clickClose = () => {
        setIsOpen(false);
        console.log("close");
    }

    return {
        isOpen,
        clickClose,
        clickOpen
    }
}