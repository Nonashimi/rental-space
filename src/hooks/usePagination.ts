"use client"
import { useState } from "react"


type Props = {
    maxPages: number,
    currentPage?: number,
    minPage?: number,
}

export const usePagination = ({maxPages, currentPage = 1, minPage = 0}: Props) => {
    const [thisPage, setThisPage] = useState(currentPage);

    const clickPrev = () => {
        if (thisPage > minPage) {
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