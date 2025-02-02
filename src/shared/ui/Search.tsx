"use client";

import React, { useState } from "react";
import Input from "./input";
import { SearchIcon } from "lucide-react";
import { useTypeStore } from "@/store/search-type";
import Box from "../components/box";

function Search() {
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
    }
  };

  return (
    <div className="flex flex-col relative" onBlur={handleBlur} onFocus={handleFocus}>
      <div className="relative flex gap-[1px] items-center border w-[900px] rounded-full shadow-lg group focus-within:bg-[#ebebeb]">
        <Input inputId={1} className="w-1/2" placeholder="где" value={location} changeValue={setLocation} />
        <div className="h-[30px] w-[1px] bg-gray-300"></div>
        <Input inputId={2} className="w-1/4" placeholder="прибытие" value={arrivalDate} changeValue={setArrival} />
        <div className="h-[30px] w-[1px] bg-gray-300"></div>
        <Input inputId={3} className="w-1/4" placeholder="отъезд" value={exitDate} changeValue={setExit} />
        <div className="h-[30px] w-[1px] bg-gray-300"></div>
        <Input inputId={4} className="w-1/2" placeholder="кто едет?" value={countOfPeople} changeValue={setCountOfPeople} />
        
        <button
          className="absolute w-[50px] h-[50px] bg-purple-700 flex justify-center items-center gap-2 right-2 rounded-full transition-all duration-300 text-white 
          group-focus-within:w-[120px]"
          tabIndex={-1} // Prevents button from taking focus
        >
          <SearchIcon className="w-[20px] h-[20px] text-white" />
          <p className="font-bold hidden group-focus-within:block">Искать</p>
        </button>
      </div>

      {type.isFocus && (
        <div className="w-[900px] mt-3 absolute top-[65px]">
          {type.typeId === 1 && <Box className="w-[400px] h-[300px]">{type.typeId}</Box>}
          {(type.typeId === 2 || type.typeId === 3) && <Box className="w-[900px] h-[300px]">{type.typeId}</Box>}
          {type.typeId === 4 && <Box className="w-[400px] h-[300px] ml-auto">{type.typeId}</Box>}
        </div>
      )}
    </div>
  );
}

export default Search;
