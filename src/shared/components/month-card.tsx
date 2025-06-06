import { cn } from '@/lib/utils';
import { month, useSearchDatasStore } from '@/store/search-datas';
import { Calendar, CalendarCheck } from 'lucide-react';
import React from 'react'

type Props = {
  month: string,
  year: number,
  id: string,
  onClick: () => void,
}

function MonthCard({month, year, onClick, id}: Props) {
  const {months} = useSearchDatasStore();
  const isIncluded = months.some((month) => month.id === id);
  return (
    <div onClick={onClick} className={cn(
    "min-w-[122px] cursor-pointer min-h-[136px] flex flex-col justify-center items-center border rounded-xl hover:border-[#000] hover:bg-gray-100 transition-all duration-300 active:scale-90",
    { 'border-[#000] bg-gray-100': isIncluded }
  )}>
      {
        isIncluded?
          <CalendarCheck className='text-[#6b6b6b] font-[400]' width={40} height={40}/>
          :
          <Calendar className='text-[#6b6b6b] font-[400]' width={40} height={40}/>

      }
      <div className="font-semibold">{month}</div>
      <div className="">{year}</div>
    </div>
  )
}

export default MonthCard;