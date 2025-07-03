"use client"
import { useState } from "react"


type Props = {
    maxPages: number,
    newPage?: number
}

export const usePagination = ({maxPages, newPage = 1}: Props) => {
    const [thisPage, setThisPage] = useState(newPage);

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
    const clickPoint = (index:number) => {
        setThisPage(index);
    }


    return {
        maxPages,
        thisPage,
        clickPrev,
        clickNext,
        clickPoint,
    }
}