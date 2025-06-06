"use client"
import { useSearchDatasStore } from '@/store/search-datas';
import React, { useEffect, useState } from 'react'
import MonthProgressBar from './month-progress-bar';
import MonthModal, { typeCalendar } from './month-modal';

type Props = {}

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsTexts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function MonthChoose({}: Props) {
    const {dataFromMonths, activeMonth, setActiveMonth, setDataFromMonths} = useSearchDatasStore();
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    const [isEndModalOpen, setIsEndModalOpen] = useState(false);
 
     const changeMonth = (month: number) => {
        setActiveMonth(month);
        const now = new Date();
        console.log(dataFromMonths.checkIn);
        const forCheckIn = dataFromMonths.checkIn ? dataFromMonths.checkIn : new Date(now.getFullYear(), now.getMonth() + 1, 1);
        setDataFromMonths({
            checkIn: forCheckIn,
            checkOut: new Date(forCheckIn.getFullYear(), forCheckIn.getMonth() + month, forCheckIn.getDate())
        });
     }

     useEffect(() => {
        if(!dataFromMonths.checkIn && !dataFromMonths.checkOut){
            changeMonth(activeMonth);
        }
     },[]);

    
    
    

    const getNewCounter = (date: Date, type: typeCalendar) => {
        const now = new Date();
        return (date.getFullYear() - now.getFullYear()) * 12 + (date.getMonth() - now.getMonth()) + (type === typeCalendar.exit? 1: 0);
    }
  return (
    <>
        <MonthModal getNewCounter={getNewCounter} setActiveMonth = {setActiveMonth} dataFromMonths={dataFromMonths} setDataFromMonths={setDataFromMonths} setInOpen = {setIsStartModalOpen} setOutOpen = {setIsEndModalOpen} inOpen = {isStartModalOpen} outOpen = {isEndModalOpen}/>
        <div className="mt-10 flex flex-col items-center">
            <p className="text-[18px] font-semibold">When`s your trip?</p>
            <MonthProgressBar activeMonth={activeMonth} setActiveMonth={changeMonth}/>
            <div className="flex items-center mt-5 gap-2">
                <p onClick={() => setIsStartModalOpen(true)} className="font-semibold relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[1px] after:bg-gray-500">
                    {weeks[dataFromMonths.checkIn?.getDay() ?? 0]}, {monthsTexts[dataFromMonths.checkIn?.getMonth() ?? 0]} {dataFromMonths.checkIn?.getDate() ?? ''}
                </p>
                <span className="">to</span>
                <p onClick={() => setIsEndModalOpen(true)} className="font-semibold relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[1px] after:bg-gray-500">
                    {weeks[dataFromMonths.checkOut?.getDay() ?? 0]}, {monthsTexts[dataFromMonths.checkOut?.getMonth() ?? 0]} {dataFromMonths.checkOut?.getDate() ?? ''}
                </p>
            </div>

        </div>
    </>
  )
}

export default MonthChoose