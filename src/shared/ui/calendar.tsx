import { cn } from '@/lib/utils';
import { use, useState } from 'react';
import { DataFromDate } from './Search';
import { data } from 'framer-motion/client';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysShort = ['Sa', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat'];

export enum CalendarType {
  checkIn = 'checkIn',
  checkOut = 'checkOut'
}
type Props = {
  date: Date;
  currentMonth: number;
  currentYear: number;
  type: CalendarType;
  dataFromDate: DataFromDate | undefined;
  setDataFromDate: (data: DataFromDate) => void;
};

export default function Calendar({date, currentMonth, currentYear, type, dataFromDate, setDataFromDate}: Props) {
  
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dates: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      dates.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      dates.push(d);
    }

    return dates;
  };
    
  const checkIn = (date: Date | null) => {
    if (dataFromDate) {
      setDataFromDate({
        ...dataFromDate,
        checkIn: date,
      });
    }
  };

  const checkOut = (date: Date | null) => {
    setDataFromDate(
      {...dataFromDate, checkOut: date}
    );
  };
  const switchAll = (date: Date | null) => {
    setDataFromDate({
      checkIn: date,
      checkOut: null,
    });
  };
  
  const dates = generateCalendar();
  const today = new Date();
  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>

      <div className="grid grid-cols-7 text-center font-bold text-gray-600 mb-2">
        {daysShort.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-y-2">
        {dates.map((day, index) => {
          const isPast = ( day || 0 ) < date.getDate() && currentMonth === today.getMonth();
          const dayDate = new Date(currentYear, currentMonth, day || 0);
          const isCheckIn = dataFromDate?.checkIn && dayDate.toDateString() === dataFromDate.checkIn.toDateString();
          const isCheckOut = dataFromDate?.checkOut && dayDate.toDateString() === dataFromDate.checkOut.toDateString();
          const isStart = dataFromDate?.checkIn && dataFromDate?.checkOut && dayDate.toDateString() === dataFromDate.checkIn.toDateString();
          const isEnd = dataFromDate?.checkIn && dataFromDate?.checkOut && dayDate.toDateString() === dataFromDate.checkOut.toDateString();
          const isSelected = isCheckIn || isCheckOut;
          const isInRange = dataFromDate?.checkIn && dataFromDate?.checkOut && dayDate > dataFromDate.checkIn && dayDate < dataFromDate.checkOut;
          return (
            <div className={cn(
                    {"bg-[#ebebeb]": isInRange}, 
                    {"rounded-[100%_0_0_100%] bg-[#ebebeb]": isStart},
                    {"rounded-[0_100%_100%_0] bg-[#ebebeb]": isEnd},
                    "min-w-[50px] h-[50px]")} key={index}>
              <div
                onClick={
                    isPast
                      ? undefined
                      : () => {
                         if (!dataFromDate?.checkIn) {
                          checkIn(dayDate);
                        }else if(dataFromDate?.checkIn && dayDate > dataFromDate.checkIn){
                          checkOut(dayDate);
                        }else{
                          switchAll(dayDate);
                        } 
                  }}
                key={`${index}-${currentMonth}`}
                className={cn(
                            `h-full flex items-center justify-center rounded-full box-border relative z-4 
                            ${isPast ? 'text-gray-400 pointer-events-none' : ' text-black cursor-pointer'}}`,
                            {
                              'bg-[#b233fc] border-none text-white': isSelected,
                            }
                        )}
              >
                {day || ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
