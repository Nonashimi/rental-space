"use client"
import { useState } from "react"




export const usePagination = (maxPages: number, showPages: number) => {
    const [thisPage, setThisPage] = useState(1);


    const clickPrev = () => {
        if (thisPage > 1) {
            setThisPage(thisPage - 1);
        }
    };

    const clickNext = () => {
        if (thisPage < maxPages) {
            setThisPage(thisPage + 1);
        }
    };

    return {
        thisPage,
        clickPrev,
        clickNext
    }
}