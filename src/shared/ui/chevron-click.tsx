import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

type Props = {
    handleChevronBtn: () => void
    type: ChevronType
}

export enum ChevronType {
    left = "left",
    right = "right"
}

function ChevronCLick({handleChevronBtn, type}: Props) {
  return (
    <div onClick={(e) => {
        e.stopPropagation();
        handleChevronBtn()}} 
        className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-300 bg-white opacity-90 cursor-pointer hover:scale-105">
        {type === ChevronType.left 
            ?<ChevronLeft size={20}/>
            :<ChevronRight size={20}/>
        }
    </div>
  )
}

export default ChevronCLick