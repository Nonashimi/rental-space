import { cn } from '@/lib/utils'
import { useViewType } from '@/store/view-type'
import { List, Map } from 'lucide-react'
import React from 'react'

type Props = {
    className?: string,
}

function SwitchToMap({className}: Props) {
  const {isItList, handleSwitch} = useViewType();
  return (
   <button onClick={handleSwitch} className={cn("bg-[#222222] p-4 flex none md:block  justify-center items-center transition-all duration-300 rounded-full hover:scale-105 fixed z-[5]  bottom-14 left-[50%] translate-x-[-50%]", className)}>
        {
            isItList
            ? <div className="text-white flex gap-2 text-[15px] font-semibold">Показать карту <Map className={"text-white"} size={20}/></div>
            : <div className="text-white flex gap-2 text-[15px] font-semibold">Показать список <List className='text-white' size={20}/></div>
        }
   </button>
  )
}

export default SwitchToMap