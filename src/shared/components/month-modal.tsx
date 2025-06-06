"use-client"


import React, { useEffect, useState } from 'react'
import Calendars from './Calendars'
import Button, { VariantsOfButton } from '../ui/button'
import Modal, { SizeForModal } from './modal'
import { Dates } from '@/store/search-datas'
import { CalendarMode, CalendarType } from '../ui/calendar'

type Props = {
  inOpen: boolean,
  outOpen: boolean,
  setInOpen: (value: boolean) => void,
  setOutOpen: (value: boolean) => void,
  getNewCounter: (date: Date, type: typeCalendar) => number,
  dataFromMonths: Dates,
  setDataFromMonths: (date: Dates) => void,
  setActiveMonth: (month: number) => void,
}

export enum typeCalendar {
    exit = "EXIT",
    arrive = "ARRIVE"
}

function MonthModal({inOpen, outOpen, setInOpen, setOutOpen, getNewCounter, dataFromMonths, setDataFromMonths, setActiveMonth}: Props) {
    const [dateData, setDateData] =  useState<Dates>(dataFromMonths);
    useEffect(() => {
        console.log("zxvfb ");
        setDateData(dataFromMonths);
    }, [dataFromMonths]);


    function getMonthDifference(checkIn: Date, checkOut: Date): number {
    let months = 
        (checkOut.getFullYear() - checkIn.getFullYear()) * 12 +
        (checkOut.getMonth() - checkIn.getMonth());

    if (checkOut.getDate() < checkIn.getDate()) {
        months--;
    }

    return Math.max(months, 1);
    }


    const setCorrectDate = (dateData: Dates) => {
        const checkIn = dateData.checkIn!;
        const checkOut = dateData.checkOut!;
        if(checkIn < checkOut){
            setDateData(dateData);
        }
    }

    const handleSave = () => {
        setDataFromMonths(dateData);
        setInOpen(false);
        setOutOpen(false);
        setActiveMonth(getMonthDifference(dateData.checkIn!, dateData.checkOut!));
    }

  return (
    <div>
      {
           inOpen &&  <Modal clickClose={() => setInOpen(false)} size={SizeForModal.xxl} title="Choose a start date">
                <div className="pt-6 pb-3">
                    <div className="px-5">
                        <Calendars CalendarMode={CalendarMode.specific} CalendarType={CalendarType.checkIn} dates={dateData!} setDates={setCorrectDate} newCounter={getNewCounter(dateData?.checkIn!, typeCalendar.exit)}/>
                    </div>
                    <div className="w-full h-[1px] bg-[#ebebeb]"></div>
                    <div className="flex justify-end px-5 pt-3">
                        <Button onClick={handleSave} className='w-[110px]' variant={VariantsOfButton.filling}>Save</Button>
                    </div>
                </div>
            </Modal>
        }
        {
           outOpen &&  <Modal clickClose={() => setOutOpen(false)} size={SizeForModal.xxl} title="Choose an end date">
                <div className="pt-6 pb-3">
                    <div className="px-5">
                        <Calendars CalendarMode={CalendarMode.specific} CalendarType={CalendarType.checkOut} dates={dateData!} setDates={setCorrectDate} newCounter={getNewCounter(dataFromMonths.checkOut!, typeCalendar.arrive)}/>
                    </div>
                    <div className="w-full h-[1px] bg-[#ebebeb]"></div>
                    <div className="flex justify-end px-5 pt-3">
                        <Button onClick={handleSave} className='w-[110px]' variant={VariantsOfButton.filling}>Save</Button>
                    </div>
                </div>
            </Modal>
        }
    </div>
  )
}

export default MonthModal