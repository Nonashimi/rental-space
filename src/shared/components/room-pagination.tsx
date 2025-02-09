import { cn } from '@/lib/utils'
import { PlusOrMinus } from '@/store/filters'
import { Minus, Plus } from 'lucide-react'
import React from 'react'

type Props = {
    title: string,
    id: number,
    setRooms: ( id: number, PlusOrMinus: PlusOrMinus) => void,
    count: number
}

function RoomPagination({title, id, setRooms, count}: Props) {
  return (
    <div className="flex justify-between items-center">
                  <div className="text-[#585555] font-bold">{title}</div>
                  <div className="flex gap-2 items-center">
                    <div 
                        onClick={() => {setRooms(id, PlusOrMinus.minus)}}
                        className={cn(
                            "w-[35px] h-[35px] rounded-full border flex justify-center items-center border-[#646262] cursor-pointer",
                            count === 0 && 'pointer-events-none opacity-30'
                            )}>
                            <Minus className='text-[#646262]' size={18}/>
                    </div>
                    <div className="w-[70px] text-center">{count === 0 ? 'Неважно' : `${count}+`}</div>
                    <div 
                        onClick={() => {setRooms(id, PlusOrMinus.plus)}}
                        className={cn(
                            "w-[35px] h-[35px] rounded-full border flex justify-center items-center border-[#646262] cursor-pointer"
                            ,
                            count >= 8 && 'pointer-events-none opacity-30'
                            )}>
                            <Plus className='text-[#646262]' size={18}/>
                    </div>
                  </div>
    </div>
  )
}

export default RoomPagination