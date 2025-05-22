import { useState } from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysShort = ['Sa', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat'];


type Props = {
  date: Date;
  currentMonth: number;
  currentYear: number;
};

export default function Calendar({date, currentMonth, currentYear}: Props) {
  
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
          const isToday =
            day === date.getDate() &&
            currentMonth === date.getMonth() &&
            currentYear === date.getFullYear();

          const isPast = ( day || 0 ) < date.getDate() && currentMonth === today.getMonth();

          return (
            <div
              key={`${index}-${currentMonth}`}
              className={`w-[50px] h-[50px] flex items-center justify-center rounded-full  ${isPast ? 'text-gray-400 pointer-events-none' : 'text-black cursor-pointer hover:border hover:border-black'} 
              }`}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}
