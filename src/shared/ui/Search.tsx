"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Input from "./input";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import { useTypeStore } from "@/store/search-type";
import Box from "../components/box";
import BlackFon from "../components/black-fon";
import { cn } from "@/lib/utils";
import SearchDestinction from "../components/search-destinction";
import Button, { VariantsOfButton } from "./button";
import Calendar, { CalendarType } from "./calendar";


interface Props{
  className?: string,
  isScrolled?: boolean,
  negativeScroll?: () => void,
  positiveScroll?: () => void
}

export type DataFromDate = {
  checkIn?: Date | null;
  checkOut?: Date | null;
}


const btns = [
  { id: 1, title: "Date" },
  { id: 2, title: "Months" },
  { id: 3, title: "Flexible" },
];



function Search({className, isScrolled, negativeScroll, positiveScroll}: Props) {
  const [location, setLocation] = useState("");
  const [arrivalDate, setArrival] = useState("");
  const [exitDate, setExit] = useState("");
  const [countOfPeople, setCountOfPeople] = useState("");
  const type = useTypeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dataFromDate, setDataFromDate] = useState<DataFromDate>();
  const handleFocus = () => {
    type.setFocus(true);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        type.setFocus(false);
        positiveScroll?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [positiveScroll, type]);



  const today = new Date();
  const [counter, setCounter] = useState(0);
  const date = useMemo(() => {
    return new Date(today.getFullYear(), today.getMonth() + counter, 1);
  }, [counter]);
  const nextDate = useMemo(() => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }, [date]);


  const handlePrev = () => {
    setCounter((prev) => {
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCounter((prev) => {
      return prev + 1;
    });
  };
  const getClassNameInput = (id: number) => {
    return cn("w-1/2", {"p-3": isScrolled}, {"bg-white shadow-lg": type.isFocus && id === type.typeId});
  }

  return (
  
  <>
    {type.isFocus && <BlackFon/>}
    <div ref={containerRef} onClick={negativeScroll} className={cn(className, "inline-flex flex-col items-center relative z-20 header-duration")} onFocus={handleFocus}>
        <div className={cn(isScrolled?'w-[400px]':'w-[900px]'," header-duration relative flex gap-[1px] items-center border rounded-full shadow-lg group", type.isFocus && "bg-[#ebebeb]")}>
          <Input inputId={1} className={getClassNameInput(1)} placeholder="где" value={location} onChange={(e) => setLocation(e.target.value)} />
          <div className="h-[30px] w-[1px] bg-gray-300"></div>
          <div className="w-1/2 flex items-center">
            {!isScrolled
                  ? (<>
                    <Input inputId={2} className={getClassNameInput(2)} placeholder="прибытие" value={arrivalDate} onChange={(e) => setArrival(e.target.value)} />
                       <div className="h-[30px] w-[1px] bg-gray-300"></div>
                    <Input inputId={3} className={getClassNameInput(3)} placeholder="отъезд" value={exitDate} onChange={(e) => setExit(e.target.value)} />
                  </>)
                  : (
                    <Input inputId={2} className="w-full p-3" placeholder="Неделя" value={arrivalDate} onChange={(e) => setArrival(e.target.value)} />
                  )
            }
          </div>
          <div className="h-[30px] w-[1px] bg-gray-300"></div>
          <Input inputId={4} className={getClassNameInput(4)} placeholder="кто едет?" value={countOfPeople} onChange={(e) => setCountOfPeople(e.target.value)} />
          
          <button
            className={cn(isScrolled?'w-[30px] h-[30px]':'w-[50px] h-[50px]',"header-duration absolute bg-purple-700 flex justify-center items-center gap-2 right-2 rounded-full text-white", type.isFocus && "w-[120px]")}
            tabIndex={-1}
          >
            <SearchIcon className={cn(" text-white w-[20px] h-[20px]" , {"w-[15px] h-[15px]": isScrolled})} />
            <p className={cn("font-bold hidden", type.isFocus && "block")}>Искать</p>
          </button>
        </div>

        {type.isFocus && (
          <div className="blocks w-[900px] mt-3 absolute top-[65px]">
            {type.typeId === 1 && (
                <div className="rounded-3xl overflow-hidden w-[450px] h-[550px]">
                    <Box className="w-full h-full overflow-y-auto">
                      <SearchDestinction />
                    </Box>
                </div>
            )}
            {(type.typeId === 2 || type.typeId === 3) && (
                <div className="rounded-3xl overflow-hidden w-[900px] h-[550px]">
                    <Box className="w-full h-full overflow-y-auto">
                      <div className="flex justify-center">
                        <div className="gap-2 bg-[#ebebeb] p-1 rounded-3xl inline-flex">
                          {btns.map((btn) => (
                            <Button key={btn.id} className="py-2 px-5 rounded-3xl hover:bg-[#a3a3a3]" variant={VariantsOfButton.transparent}>
                              {btn.title}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between ">
                        <ChevronLeft onClick={handlePrev} className={cn(counter == 0 ? "pointer-events-none opacity-[10%]" : "cursor-pointer")}/>
                        <div className="grid grid-cols-2 gap-8 mt-4">
                          <Calendar dataFromDate={dataFromDate} setDataFromDate={setDataFromDate} type={CalendarType.checkIn} date={today} currentMonth={date.getMonth()} currentYear={date.getFullYear()}/>
                          <Calendar dataFromDate={dataFromDate} setDataFromDate={setDataFromDate}  type={CalendarType.checkOut} date={nextDate} currentMonth={nextDate.getMonth()} currentYear={nextDate.getFullYear()}/>
                        </div>
                        <ChevronRight onClick={handleNext} className="cursor-pointer"/>
                      </div>
                    </Box>
                </div>
            )}
            {type.typeId === 4 && <Box className="w-[400px] h-[300px] ml-auto">{type.typeId}</Box>}
          </div>
        )}
      </div>
  
  </>
    
  );
}

export default Search;
