"use client";

import React, { useState } from "react";
import Input from "./input";
import { SearchIcon } from "lucide-react";
import { useTypeStore } from "@/store/search-type";
import Box from "../components/box";
import BlackFon from "../components/black-fon";
import { cn } from "@/lib/utils";
import SearchDestinction from "../components/search-destinction";


interface Props{
  className?: string,
  isScrolled?: boolean,
  negativeScroll?: () => void,
  positiveScroll?: () => void
}

function Search({className, isScrolled, negativeScroll, positiveScroll}: Props) {
  const [location, setLocation] = useState("");
  const [arrivalDate, setArrival] = useState("");
  const [exitDate, setExit] = useState("");
  const [countOfPeople, setCountOfPeople] = useState("");
  const type = useTypeStore();

  const handleFocus = () => {
    setTimeout(() => type.setFocus(true), 0);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      type.setFocus(false);
      positiveScroll?.();
    }
  };

  return (
  
  <>
    {type.isFocus && <BlackFon/>}
    <div onClick={negativeScroll} className={cn(className, "inline-flex flex-col items-center relative z-20 header-duration")} onBlur={handleBlur} onFocus={handleFocus}>
        <div className={cn(isScrolled?'w-[400px]':'w-[900px]'," header-duration relative flex gap-[1px] items-center border rounded-full shadow-lg group focus-within:bg-[#ebebeb]")}>
          <Input inputId={1} className={cn("w-1/2", {"p-3": isScrolled})} placeholder="где" value={location} onChange={(e) => setLocation(e.target.value)} />
          <div className="h-[30px] w-[1px] bg-gray-300"></div>
          <div className="w-1/2 flex items-center">
            {!isScrolled
                  ? (<>
                    <Input inputId={2} className={cn("w-1/2", {"p-3": isScrolled})} placeholder="прибытие" value={arrivalDate} onChange={(e) => setArrival(e.target.value)} />
                       <div className="h-[30px] w-[1px] bg-gray-300"></div>
                    <Input inputId={3} className={cn("w-1/2", {"p-3": isScrolled})} placeholder="отъезд" value={exitDate} onChange={(e) => setExit(e.target.value)} />
                  </>)
                  : (
                    <Input inputId={2} className="w-full p-3" placeholder="Неделя" value={arrivalDate} onChange={(e) => setArrival(e.target.value)} />
                  )
            }
          </div>
          <div className="h-[30px] w-[1px] bg-gray-300"></div>
          <Input inputId={4} className={cn("w-1/2", {"p-3": isScrolled})} placeholder="кто едет?" value={countOfPeople} onChange={(e) => setCountOfPeople(e.target.value)} />
          
          <button
            className={cn(isScrolled?'w-[30px] h-[30px]':'w-[50px] h-[50px]',"header-duration absolute bg-purple-700 flex justify-center items-center gap-2 right-2 rounded-full text-white group-focus-within:w-[120px]")}
            tabIndex={-1}
          >
            <SearchIcon className={cn(" text-white w-[20px] h-[20px]" , {"w-[15px] h-[15px]": isScrolled})} />
            <p className="font-bold hidden group-focus-within:block">Искать</p>
          </button>
        </div>

        {type.isFocus && (
          <div className="w-[900px] mt-3 absolute top-[65px]">
            {type.typeId === 1 && (
                <div className="rounded-3xl overflow-hidden w-[450px] h-[550px]">
                    <Box className="w-full h-full overflow-y-auto">
                      <SearchDestinction />
                    </Box>
                </div>
            )}
            {(type.typeId === 2 || type.typeId === 3) && <Box className="w-[900px] h-[300px]">{type.typeId}</Box>}
            {type.typeId === 4 && <Box className="w-[400px] h-[300px] ml-auto">{type.typeId}</Box>}
          </div>
        )}
      </div>
  
  </>
    
  );
}

export default Search;
