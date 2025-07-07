import { cn } from '@/lib/utils';
import { Dates, TypeOfDate } from '@/store/search-datas';
import { useTypeStore } from '@/store/search-type';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export enum CalendarType {
  checkIn = 'checkIn',
  checkOut = 'checkOut',
  clearAll = "clearAll"
}

export enum CalendarMode {
  auto = 'auto',
  specific = 'specific'
}




type Props = {
  date: Date;
  currentMonth: number;
  currentYear: number;
  type?: CalendarType;
  mode?: CalendarMode;
  dataFromDate: Dates | undefined;
  setDataFromDate: (data: Dates) => void;
  isMin?: boolean,
  activeDate?: TypeOfDate,
  setActiveDate?: (value: TypeOfDate) => void,
};

enum flag  {
  low = "LOW",
  high = "HIGH",
}

export default function Calendar({currentMonth, currentYear, dataFromDate, setDataFromDate, mode = CalendarMode.auto, type, isMin = false, activeDate, setActiveDate}: Props) {
  
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dates: (number | flag)[] = [];
    for (let i = 0; i < firstDay; i++) {
      dates.push(flag.low);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      dates.push(d);
    }
    
    for(let i = 0; i < dates.length%7; i++){
      dates.push(flag.high);
    }

    return dates;
  };


  const focusType = useTypeStore();

  const checkIn = (date: Date | null) => {
      setDataFromDate({
        ...dataFromDate,
        checkIn: date,
      });
    
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
  


  const autoMode = (dayDate: Date) => {
    if (activeDate === TypeOfDate.checkIn) {
      checkIn(dayDate);
      setActiveDate?.(TypeOfDate.checkOut);
      focusType.setTypeId(3);
      if(dataFromDate?.checkOut && dayDate > dataFromDate.checkOut){
        switchAll(dayDate);
      }
      console.log("check in");
    }else if(activeDate === TypeOfDate.checkOut){
      if(dataFromDate?.checkIn && dataFromDate.checkIn > dayDate){
        switchAll(dayDate);
      }else{
        checkOut(dayDate);
      }
      console.log('check out');
    }
  }


  const specificMode = (dayDate: Date) => {
    console.log("clicked");
    if(type && type === CalendarType.checkIn){
      if(dataFromDate?.checkOut){
        const checkOutDate = new Date(dataFromDate.checkOut);
        const maxAllowedDate = new Date(dayDate); 
        maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() + 1);
        if (checkOutDate > maxAllowedDate) {
          setDataFromDate({checkIn: dayDate, checkOut: maxAllowedDate});
        }else{
          checkIn(dayDate);
        }
      }else{
        checkIn(dayDate);
      }
    }else if(type && type === CalendarType.checkOut){
      checkOut(dayDate);
    }
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

      <div className={cn("grid grid-cols-7 text-center font-bold text-[var(--text-gray-color)] mb-2", isMin ?'text-[14px]':'')}>
        {daysShort.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className={cn("grid grid-cols-7 text-center gap-y-2", isMin ?'text-[14px]':'')}>
        {dates.map((day, index) => {
          const isPast = new Date(currentYear, currentMonth, typeof day === 'number'?day:0).getTime() < new Date(today.setHours(0, 0, 0, 0)).getTime();
          const dayDate = new Date(currentYear, currentMonth, typeof day === 'number'?day:day===flag.low?0:new Date(currentYear, currentMonth + 1, 0).getDate());
          const isCheckIn = dataFromDate?.checkIn && dayDate.toDateString() === dataFromDate.checkIn.toDateString();
          const isCheckOut = dataFromDate?.checkOut && dayDate.toDateString() === dataFromDate.checkOut.toDateString();
          const isStart = typeof day === 'number' && dataFromDate?.checkIn && dataFromDate?.checkOut && dayDate.toDateString() === dataFromDate.checkIn.toDateString();
          const isEnd = typeof day === 'number' && dataFromDate?.checkIn && dataFromDate?.checkOut && dayDate.toDateString() === dataFromDate.checkOut.toDateString();
          const isSelected = (isCheckIn || isCheckOut) && typeof day === 'number';
          const isInRange =dataFromDate?.checkIn && dataFromDate?.checkOut && dayDate > dataFromDate.checkIn && dayDate < dataFromDate.checkOut;
          const isSpecificMode =  mode === CalendarMode.specific;
          const limit =
            isSpecificMode &&
            dataFromDate?.checkIn &&
            (() => {
              const checkInDate = new Date(dataFromDate.checkIn);
              checkInDate.setMonth(checkInDate.getMonth() + 12);
              return dayDate > checkInDate;
            })();
          return (
            <div className={cn(
                    {"bg-[#f7f7f7] dark:bg-[#2e2e2e]": isInRange}, 
                    {"rounded-[100%_0_0_100%] bg-[#f7f7f7] dark:bg-[#2e2e2e]": isStart},
                    {"rounded-[0_100%_100%_0] bg-[#f7f7f7] dark:bg-[#2e2e2e]": isEnd},
                    "min-w-full aspect-[1/1]")} key={index}>
              <div
                onClick={
                    isPast || limit || typeof day !== 'number'
                      ? undefined
                      : () => {mode === CalendarMode.auto ? autoMode(dayDate) : specificMode(dayDate)}}
                key={`${index}-${currentMonth}`}
                className={cn(
                            `h-full flex items-center justify-center rounded-full box-border relative z-4
                            ${isPast || typeof day !== 'number' || limit ? 'text-[var(--text-gray-color)] pointer-events-none' : 'hover:border hover:border-black dark:hover:border-[#6e6c6c] cursor-pointer text-black'}}`,
                            {
                              'bg-[var(--primary)] border-none text-white': isSelected ,
                              'bg-[var(--text-gray-color)] border-none text-white pointer-events-none':  isSpecificMode &&
                                (
                                  (isCheckIn && type === CalendarType.checkOut) ||
                                  (isCheckOut && type === CalendarType.checkIn)
                                )
                            }
                        )}
              >
                {typeof day === 'number'?day:''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
