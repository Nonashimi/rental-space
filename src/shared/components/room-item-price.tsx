'use client'
import { useEffect, useRef, useState } from "react";
import Button, { VariantsOfButton } from "../ui/button"
import InputTitle from "../ui/input-title"
import Calendars from "./Calendars"
import { Dates, TypeOfDate } from "@/store/search-datas";
import { useTypeStore } from "@/store/search-type";
import { cn } from "@/lib/utils";


export const RoomItemPrice = () => {
  const [isOpen, setisOpen] = useState(false);
  const [dates, setDates] = useState<Dates>({});
  const type = useTypeStore();
  const [activeDate, setActiveDate] = useState<TypeOfDate>(TypeOfDate.checkIn);
  const formatDate = (date: Date | null | undefined) => {
    if(date){
      return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    }
    return '';
  };
  const handleClear = () => {
    setActiveDate(TypeOfDate.checkIn);
    setDates({});
  }
  const containerRef = useRef<HTMLDivElement>(null);

 
  const handleOpen = () => {
    setisOpen(true);
  }
  const handleClose = () => {
    setisOpen(false);
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


  return  <div className="h-full">
            <div className="sticky top-16">
                <div className="bg-[var(--modal-bg-color)] w-full p-6 rounded-xl shadow-2xl border  border-[var(--line-color)]">
                  <p className="text-[20px] pb-5">Add dates for prices</p>
                  <div className=" border border-[var(--line-color)] rounded-lg">
                    <div onClick={handleOpen} className="grid grid-cols-2">
                       <InputTitle  value={formatDate(dates.checkIn)} className="rounded-none px-2 col-span-1 border-r border-[var(--line-color)]" title="CHECK-IN" placeHolder="Add date"/>
                       <InputTitle  value={formatDate(dates.checkOut)} className="rounded-none px-2 col-span-1" title="CHECKOUT" placeHolder="Add date"/>
                    </div>
                    <InputTitle className="rounded-none px-2 col-span-2 border-t border-[var(--line-color)]" title="Guests" placeHolder="add quests"/>
                  </div>
                  {
                    isOpen && <div ref={containerRef} className="relative z-10">
                                <div className="absolute top-[-138px] right-[-25px] w-[650px] bg-[var(--modal-bg-color)] shadow-[0_4px_24px_rgba(0,0,0,0.6)] py-4 px-6 rounded-xl">
                                  <div className="grid grid-cols-2">
                                    <div className="col-span-1">
                                      <p className="font-semibold text-[18px]">Select dates</p>
                                      <p className="text-[var(--text-gray-color)]">Minimum stay: 2 nights</p>
                                    </div>
                                    <div className="col-span-1 grid grid-cols-2 border border-[var(--line-color)] rounded-lg">
                                      <InputTitle active={TypeOfDate.checkIn === activeDate} disabled={TypeOfDate.checkIn !== activeDate} value={formatDate(dates.checkIn)} className={cn("rounded-none px-2 col-span-1", {'border-r border-[var(--line-color)]':TypeOfDate.checkIn === activeDate})} title="CHECK-IN" placeHolder="Add date"/>
                                      <InputTitle active={TypeOfDate.checkOut === activeDate} disabled={TypeOfDate.checkOut !== activeDate} value={formatDate(dates.checkOut)} className="rounded-none px-2 col-span-1" title="CHECKOUT" placeHolder="Add date"/>
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
                  <Button className="w-full rounded-full py-3 mt-4" variant={VariantsOfButton.filling}>
                    Reserve
                  </Button>
                </div>
            </div>
          </div>
}