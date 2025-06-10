import { usePagination } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react'
import React from 'react'

type Props = {
    title: string,
    description: string,
}

function GuestChevron({title, description}: Props) {
    const maxPage = 16;
    const {thisPage, clickPrev, clickNext} = usePagination({maxPages: maxPage, newPage: 0});
  return (
    <div className="flex justify-between items-center py-3">
        <div className="flex flex-col">
            <div className="">{title}</div>
            <div className="text-[14px] text-gray-500">{description}</div>
        </div>
        <div className="flex gap-2 items-center">
            <div 
                onClick={clickPrev}
                className={cn("w-[30px] h-[30px] rounded-full border border-gray-500 flex justify-center items-center cursor-pointer",
                {'opacity-20 pointer-events-none': thisPage === 0}
            )}>
                <Minus className='text-gray-500 font-bold' width={17} height={17}/>
            </div>
            <div className="w-[30px] flex justify-center">
                {thisPage}
            </div>
            <div 
                onClick={clickNext}
                className={cn("w-[30px] h-[30px] rounded-full border border-gray-500 flex justify-center items-center cursor-pointer",
                {'opacity-20 pointer-events-none': (thisPage) >= 16}
            )}>
                <Plus className='text-gray-500 font-bold' width={17} height={17}/>
            </div>
        </div>
    </div>
  )
}

export default GuestChevron