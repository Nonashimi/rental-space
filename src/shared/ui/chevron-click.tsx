import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

type Props = {
    handleChevronBtn: () => void
    type: ChevronType,
    size?: Size
}

export enum ChevronType {
    left = "left",
    right = "right"
}

export enum Size{
  normal = "normal",
  minimal = "minimal",
}

function ChevronCLick({handleChevronBtn, type, size = Size.normal}: Props) {
  return (
    <div onClick={(e) => {
        e.stopPropagation();
        handleChevronBtn()}} 
        className={`${size === Size.normal ? "w-[30px] h-[30px]": "w-[25px] h-[25px]"} rounded-full flex items-center justify-center transition-all duration-300 bg-white opacity-90 cursor-pointer hover:scale-105`}>
        {type === ChevronType.left 
            ?<ChevronLeft size={size === Size.normal ? 20 : 15}/>
            :<ChevronRight size={size === Size.normal ? 20 : 15}/>
        }
    </div>
  )
}

export default ChevronCLick