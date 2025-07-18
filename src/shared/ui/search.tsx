"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useTypeStore } from "@/store/search-type";
import Box from "../components/box";
import BlackFon from "../components/black-fon";
import { cn } from "@/lib/utils";
import SearchDestinction from "../components/search-destinction";
import Button, { VariantsOfButton } from "./button";
import Calendars from "../components/Calendars";
import { Dates, TypeOfDate, useSearchDatasStore } from "@/store/search-datas";
import MonthChoose from "../components/month-choose";
import SearchInput from "./search-input";
import FlexibleChoose, { durationArray } from "../components/flexible-choose";
import GuestHandler from "../components/guest-handler";
import { useGuestFormat } from "@/hooks/useGuestFormat";


interface Props{
  className?: string,
  isScrolled?: boolean,
  negativeScroll?: () => void,
  positiveScroll?: () => void
}


const btns = [
  { id: 1, title: "Date" },
  { id: 2, title: "Months" },
  { id: 3, title: "Flexible" },
];




function Search({className, isScrolled, negativeScroll, positiveScroll}: Props) {
  const {dateType, setDateType, dataFromMonths, setDataFromMonths, setDataFromDate, dataFromDate, months: monthsData, duration, guestData, setActiveMonth, clearMonths, setDuration, clearGuestData, setGuestData} = useSearchDatasStore();
  const type = useTypeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDate, setActiveDate] = useState<TypeOfDate>(TypeOfDate.checkIn);

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


  const clickToDateTypes = (id: number) => {
    setDateType(id);
    if(id === 1)
      type.setTypeId(2);
    else if(id === 2 || id === 3)
      type.setTypeId(4);
  }
  const DateToStirng = (date: Date) => {
    const formatted = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long"
    });

    return formatted;
  }
  const formatMonth = (date: Dates) => {
    if(date.checkIn && date.checkOut){
      const formattedIn = DateToStirng(date.checkIn);
      const formattedOut = DateToStirng(date.checkOut);
      return `${formattedIn} - ${formattedOut}`;
    }

    return '';
  }
  const formatDate = (date: Date | null | undefined) => {
    if(date){
      return DateToStirng(date);
    }
    return '';
  }

  const stringMonths = useMemo(() => {
      const string = monthsData.map(monthData => monthData.month).join();
      return string;
    },[monthsData]);


  const stringForFlexible = () => {
    const strDur = durationArray.find(dur => dur.value === duration)?.label;
    if(monthsData.length > 0){
      return `${strDur} in ${stringMonths}`;
    }else{
      return `any ${strDur}`;
    }
  }



const clickToX = (id: number) => {
  if(id === 2 || id === 3){
    setDataFromDate({});
    type.setTypeId(2);
    setActiveDate(TypeOfDate.checkIn);
  }else if(id === 4){
    switch(dateType){
      case(2): setDataFromMonths({}); setActiveMonth(3); return;
      case(3): clearMonths(); setDuration(1); return;
    } 
  }else if(id === 5){
    clearGuestData();
  }
}


  const valueForDateInput = () => {
    console.log(dataFromDate);
    return dateType === 2 ? formatMonth(dataFromMonths) : stringForFlexible();
  }
  return (
  <>
    {type.isFocus && <BlackFon/>}
    <div ref={containerRef} className={cn(className, "inline-flex flex-col items-center relative z-20 header-duration")}>
        <div className={cn(isScrolled?'w-[400px]':'w-[90%] lg:w-[800px] xl:w-[900px]',"dark:bg-[var(--modal-bg-color)] header-duration relative flex gap-[2px] items-center border border-[var(--line-color)] rounded-full shadow-lg  group", type.isFocus && "bg-[#d6d4d4] dark:bg-[#222] border-[var(--line-color)]")}>
          <SearchInput setActiveDate={setActiveDate} clickToX={clickToX} className="w-1/3" title={!isScrolled?"Где":"Где угодно"} inputId={1} placeHolder="Поиск местности" defaultValue={""} type={type} isScrolled={isScrolled}/>
          <div className="h-[30px] w-[1px] bg-[var(--line-color)]"></div>
          <div className="w-1/3 flex items-center">
            {
              !isScrolled && dateType === 1?
                <>
                  <SearchInput setActiveDate={setActiveDate} clickToX={clickToX} className="w-1/2" title={"Прибытие"} inputId={2} value={formatDate(dataFromDate.checkIn)} placeHolder="Добавить дату" disabled={true} type={type} isScrolled={isScrolled}/>
                    <div className="h-[30px] w-[1px] bg-[var(--line-color)]"></div>
                  <SearchInput setActiveDate={setActiveDate} clickToX={clickToX} className="w-1/2" title={"Отьезд"} inputId={3} value={formatDate(dataFromDate.checkOut)}  placeHolder="Добавить дату" disabled={true} type={type} isScrolled={isScrolled}/>
                </>
               :
                <SearchInput setActiveDate={setActiveDate} clickToX={clickToX} className="w-full" title={isScrolled?"Любое время":"Когда"} inputId={4} placeHolder="Добавить дату" value={valueForDateInput()} disabled={true} type={type} isScrolled={isScrolled}/>
            }
          </div>
          <div className="h-[30px] w-[1px] bg-[var(--line-color)]"></div>
          <SearchInput setActiveDate={setActiveDate} clickToX={clickToX} className="w-1/3" inputClassName ="w-1/2" title={!isScrolled?"Кто":"Гости"} inputId={5} placeHolder="Добавить гостей" value={useGuestFormat({guestData})} type={type} isScrolled={isScrolled}/>
          <button
            className={cn(isScrolled?'w-[30px] h-[30px]':'w-[47px] h-[47px]',"header-duration absolute bg-[var(--primary)] flex justify-center items-center gap-2 right-2 rounded-full text-white", type.isFocus && "w-[120px]")}
            tabIndex={-1}
          >
            <SearchIcon
              className={cn(
                "text-white",
                isScrolled ? "w-[13px] h-[13px]" : "w-[17px] h-[17px] lg:w-[20px] lg:h-[20px]"
              )}
            />
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
            {(type.typeId === 2 || type.typeId === 3 || type.typeId === 4) && (
                <div className="rounded-3xl overflow-hidden w-[900px] h-[600px]">
                    <Box className="w-full h-full overflow-y-auto">
                      <div className="flex justify-center">
                        <div className="gap-2 bg-[#ebebeb] dark:bg-[#3a3939] p-1 rounded-3xl inline-flex">
                          {btns.map((btn) => (
                            <Button key={btn.id} onClick={() => clickToDateTypes(btn.id)} className={cn("py-2 px-5 rounded-3xl bg-transparent dark:bg-[#3a3939] dark:hover:bg-[#313131]", `${dateType === btn.id?'bg-[#fff] dark:bg-[#222] dark:hover:bg-[#222] hover:bg-[#fff] shadow-lg':'hover:bg-[#d9d6d6]'}`)} variant={VariantsOfButton.transparent}>
                              {btn.title}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {
                        dateType === 1 && <Calendars activeDate={activeDate} setActiveDate={setActiveDate} dates={dataFromDate} setDates={setDataFromDate}/> || 
                        dateType === 2 && <MonthChoose/> || 
                        dateType === 3 && <FlexibleChoose/>
                      }
                    </Box>
                </div>
            )}
            {type.typeId === 5 && 
             <div className="rounded-3xl overflow-hidden w-[450px] h-[425px] ml-auto">
                <Box className="w-full h-full overflow-y-auto">
                  <GuestHandler setGuestData={setGuestData} guestData={guestData}/>
                </Box>
             </div>
            }
          </div>
        )}
      </div>
  
  </>
    
  );
}

export default Search;
