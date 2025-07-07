"use-client"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useMemo } from 'react'
import Calendar, { CalendarMode, CalendarType } from '../ui/calendar'
import { cn } from '@/lib/utils';
import { Dates, TypeOfDate } from '@/store/search-datas';
import { usePagination } from '@/hooks/usePagination';

type Props = {
  dates: Dates,
  setDates: (value: Dates) => void,
  newCounter?: number,
  CalendarType?: CalendarType,
  CalendarMode?: CalendarMode,
  isMin?: boolean,
  activeDate?: TypeOfDate,
  setActiveDate?: (value: TypeOfDate) => void,
}
function Calendars({dates, setDates, newCounter, CalendarType, CalendarMode, isMin = false, activeDate, setActiveDate}: Props) {
    const {thisPage: counter, clickNext, clickPrev} = usePagination({maxPages: 100000, currentPage: newCounter});
    const today = new Date();
      const date = useMemo(() => {
        return new Date(today.getFullYear(), today.getMonth() + counter - 1, 1);
      }, [counter]);
      const nextDate = useMemo(() => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
      }, [date]);
    
  return (
    <div className="flex justify-between ">
        <ChevronLeft onClick={clickPrev} className={cn((counter - 1 == 0) ? "pointer-events-none opacity-[10%]" : "cursor-pointer")}/>
            <div className={cn("w-full h-full grid grid-cols-2 mt-4", isMin?'gap-4':'gap-8')}>
                <Calendar activeDate={activeDate} setActiveDate={setActiveDate} dataFromDate={dates} setDataFromDate={setDates} isMin={isMin} type={CalendarType} mode={CalendarMode} date={today} currentMonth={date.getMonth()} currentYear={date.getFullYear()}/>
                <Calendar activeDate={activeDate} setActiveDate={setActiveDate} dataFromDate={dates} setDataFromDate={setDates} isMin={isMin}  type={CalendarType} mode={CalendarMode} date={nextDate} currentMonth={nextDate.getMonth()} currentYear={nextDate.getFullYear()}/>
            </div>
        <ChevronRight onClick={clickNext} className="cursor-pointer"/>
    </div>
  )
}

export default Calendars