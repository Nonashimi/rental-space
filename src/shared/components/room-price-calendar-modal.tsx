'use client'
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import InputTitle from "../ui/input-title"
import Calendars from "./Calendars"
import Button, { VariantsOfButton } from "../ui/button"
import { cn } from "@/lib/utils"
import { Dates, TypeOfDate } from "@/store/search-datas"
import { useTypeStore } from "@/store/search-type"
import { useOrderDatas } from "@/store/order-datas"


type Props = {
  isOpen: boolean
  handleClose: () => void,
  formatDate: (date: Date | null | undefined) => string,
}
export const RoomPriceCalendarModal:FC<Props> = ({isOpen, handleClose, formatDate}) => {
  const [activeDate, setActiveDate] = useState<TypeOfDate>(TypeOfDate.checkIn);
  const containerRef = useRef<HTMLDivElement>(null);
  const {dates, setDates} = useOrderDatas();
  const handleClear = () => {
      setActiveDate(TypeOfDate.checkIn);
      setDates({});
  }

  const switchToIn = () => {
    setActiveDate(TypeOfDate.checkIn);
  }

  const switchToOut = () => {
    setActiveDate(TypeOfDate.checkOut);
  }

  const clickInX = () => {
    setDates({});
  }

  const clickOutX = () => {
    setDates({checkIn: dates.checkIn, checkOut: null});
  }



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return <div>
    {
      isOpen && <div ref={containerRef} className="relative z-10">
                  <div className="absolute top-[-131px] right-[-38px] w-[200%] box-content bg-[var(--modal-bg-color)] shadow-[0_4px_24px_rgba(0,0,0,0.6)] py-4 px-10 rounded-xl">
                    <div className="grid grid-cols-2">
                      <div className="col-span-1">
                        <p className="font-semibold text-[18px]">Select dates</p>
                        <p className="text-[var(--text-gray-color)]">Minimum stay: 2 nights</p>
                      </div>
                      <div className="col-span-1 grid grid-cols-2 border border-[var(--line-color)] rounded-lg">
                        <InputTitle clickToX={clickInX} onCLick={switchToIn} active={TypeOfDate.checkIn === activeDate} disabled={TypeOfDate.checkIn !== activeDate} value={formatDate(dates.checkIn)} className={cn("rounded-none px-2 col-span-1", {'border-r border-[var(--line-color)]':TypeOfDate.checkIn === activeDate})} title="CHECK-IN" placeHolder="Add date"/>
                        <InputTitle clickToX={clickOutX} onCLick={switchToOut} active={TypeOfDate.checkOut === activeDate} disabled={TypeOfDate.checkOut !== activeDate} value={formatDate(dates.checkOut)} className="rounded-none px-2 col-span-1" title="CHECKOUT" placeHolder="Add date"/>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Calendars activeDate={activeDate} setActiveDate={setActiveDate} dates={dates} setDates={setDates} isMin={true}/>
                    </div>
                    <div className="flex justify-end gap-4">
                      <Button onClick={handleClear} className="py-2 font-thin" variant={VariantsOfButton.transparent}><div className="underline">Clear dates</div></Button>
                      <Button onClick={handleClose} className="py-2" variant={VariantsOfButton.filling}>Close</Button>
                    </div>
                  </div>
                </div>
      }
  </div>
}