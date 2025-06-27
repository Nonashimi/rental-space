import React, { useEffect, useMemo, useState } from 'react'
import Button, { VariantsOfButton } from '../ui/button';
import MonthCard from './month-card';
import { useSearchDatasStore } from '@/store/search-datas';
import { cn } from '@/lib/utils';

type Props = {}


export const durationArray = [
  {value: 1, label: "Weekend"},
  {value: 2, label: "Week"},
  {value: 3, label: "Month"},
];


type MonthCard = {
  month: string,
  year: number,
  id: string,
}


const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function FlexibleChoose({}: Props) {
  const [months, setMonths] = useState<MonthCard[]>([]);
  const {months: monthsData, duration, setDuration, setMonths: setMonthsData} = useSearchDatasStore();
  useEffect(() => {
    const now = new Date();

    const prepareMonths = () => {
      const temp: MonthCard[] = [];

      for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() + i); 
        console.log(date);
        const obj: MonthCard = {
          month: monthNames[date.getMonth()],
          year: date.getFullYear(),
          id: `${date.getMonth()}-${date.getFullYear()}`
        };
        temp.push(obj);
      }

      setMonths(temp);
    };

    prepareMonths();
  }, []);

  const stringMonths = useMemo(() => {
    const string = monthsData.map(monthData => monthData.month).join();
    return string;
  },[monthsData]);

  return (
    <div className='flex flex-col'>
      <div className="flex flex-col gap-3 items-center py-14">
        <div className="text-[20px]">Stay for a weekend</div>
        <div className="flex gap-3">
          {durationArray.map(val => (
            <Button onClick={() => setDuration(val.value)} key={val.value} className={cn('rounded-full py-2', {'border-[#000] bg-gray-100 dark:border-[var(--line-color)] dark:bg-[#414040]':val.value===duration})} variant={VariantsOfButton.default}>{val.label}</Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-[19px] font-semibold w-[40%] text-center truncate whitespace-nowrap overflow-hidden">{monthsData.length>0?'Go in '+ stringMonths:'Go anytime'}</div>
        <div className="flex gap-4 overflow-x-auto max-w-full py-2 scrollbar-none">
          {
            months.map(month => (
              <MonthCard id={month.id} onClick={() => setMonthsData(month)} key={month.id} month={month.month} year={month.year}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default FlexibleChoose