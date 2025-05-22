import { useState } from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

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

  const handlePrev = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const dates = generateCalendar();

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-center items-center mb-4">
        {/* <button onClick={handlePrev} className="text-xl px-2">←</button> */}
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        {/* <button onClick={handleNext} className="text-xl px-2">→</button> */}
      </div>

      <div className="grid grid-cols-7 text-center font-bold text-gray-600 mb-2">
        {daysShort.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-y-2">
        {dates.map((day, index) => {
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          const isPast = ( day || 0 )< today.getDate() && currentMonth === today.getMonth();

          return (
            <div
              key={index}
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
