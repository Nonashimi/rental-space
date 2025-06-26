import { usePagination } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react'
import React from 'react'

type Props = {
    title: string,
    description: string,
    maxPeople?: number,
    changeValue?: (val: number) => void,
    checkToAdults?: () => void,
    isHaveChildren?: boolean,
    pagination:{
        thisPage: number;
        maxPages: number;
        clickPrev: () => void;
        clickNext: () => void;
        clickPoint: (index: number) => void;
    },
    clickToModal?: () => void,
    href?: string
}

function GuestChevron({title, description, maxPeople, changeValue, pagination, checkToAdults, isHaveChildren = false, clickToModal}: Props) {
    const {thisPage, clickPrev, clickNext} = pagination;
    const clickToPlus = () => {
        clickNext();
        if(maxPeople !== undefined)
            changeValue?.(1);

        if(checkToAdults){
            checkToAdults();
            changeValue?.(1);
        }

    }
    const clickToMinus = () => {
        clickPrev();
        if(maxPeople !== undefined)
            changeValue?.(-1);
        console.log(maxPeople);
    }


  return (
    <div className="flex justify-between items-center py-2">
        <div className="flex flex-col">
            <div className="text-[var(--text-gray-color)]">{title}</div>
            {
                clickToModal?
                <div onClick={clickToModal} className="text-[14px] text-[var(--text-gray-color)] underline cursor-pointer">{description}</div>
                :
                <div className="text-[14px] text-[var(--text-gray-color)]">{description}</div>
            }
        </div>
        <div className="flex gap-2 items-center">
            <div 
                onClick={clickToMinus}
                className={cn("w-[30px] h-[30px] rounded-full border border-[var(--text-gray-color)] flex justify-center items-center cursor-pointer",
                {'opacity-20 pointer-events-none': isHaveChildren?thisPage <= 1:thisPage ===0}
            )}>
                <Minus className='text-[var(--text-gray-color)] font-bold' width={17} height={17}/>
            </div>
            <div className="w-[30px] flex justify-center text-[var(--text-gray-color)]">
                {thisPage}
            </div>
            <div
                onClick={clickToPlus}
                className={cn("w-[30px] h-[30px] rounded-full border border-[var(--text-gray-color)] flex justify-center items-center cursor-pointer",
                {'opacity-20 pointer-events-none': maxPeople !== undefined ?maxPeople === 0:thisPage>=pagination.maxPages}
            )}>
                <Plus className='text-[var(--text-gray-color)] font-bold' width={17} height={17}/>
            </div>
        </div>
    </div>
  )
}

export default GuestChevron