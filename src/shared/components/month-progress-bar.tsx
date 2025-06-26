"use-client"
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react'

type Props = {
    activeMonth: number,
    setActiveMonth: (value: number) => void,
}

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function MonthProgressBar({activeMonth, setActiveMonth}: Props) {
    const RADIUS = 117;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const strokeOffset = useMemo(() => {return CIRCUMFERENCE - (CIRCUMFERENCE * activeMonth / 12)}, [activeMonth]);
  return (
    <div className="flex items-center justify-center mt-5">
        <div className="relative w-[300px] h-[300px] rounded-full bg-[#ebebeb] dark:bg-[#363636] inset-shadow-2xs flex items-center justify-center">
            <svg className="rotate-[-90deg] relative z-[10] pointer-events-none" xmlns="http://www.w3.org/2000/svg" version="1.1" width="290px" height="290px">
                <defs>
                    <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#DA22FF" />
                    <stop offset="100%" stopColor="#9733EE" />
                    </linearGradient>
                </defs>
                <circle 
                    className="transition-all duration-500 ease-in-out"
                    cx="145" 
                    cy="145" 
                    r="117" 
                    strokeLinecap="round" 
                    stroke="url(#GradientColor)" 
                    strokeWidth="55" 
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeOffset} // Пример: 2 месяца из 12
                    fill="none" />
            </svg>
            {/* Белый ползунок */}
            <div style={{transform: `rotate(${360 * activeMonth/12}deg)`}} className="absolute z-[10] h-full flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out">
                <div className="absolute w-[50px] h-[145px] flex justify-center items-start top-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-[45px] h-[45px] mt-[10px] rounded-full bg-white shadow shadow-2xl"></div>
                </div>
            </div>

            {months.map(month => (
                <div
                    key={month}
                    style={{ transform: `rotate(${360 * month / 12}deg)` }}
                    className={cn("absolute h-full flex items-center justify-center transition-all duration-500 ease-in-out")} // z-[20] здесь важен
                    >
                    <div className="absolute w-[50px] h-[145px] flex justify-center items-start top-0 left-1/2 transform -translate-x-1/2">
                        <div
                            onClick={() => setActiveMonth(month)}
                            className="relative z-[20] w-[45px] h-[45px] cursor-pointer mt-[10px] flex justify-center items-center"
                        >
                            <div className="w-[5px] h-[5px] rounded-full bg-[#6a6a6a] hover:bg-[#222] transition-all duration-300 transform" />
                        </div>
                    </div>
                </div>
            ))}

            {/* Центральная часть */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[170px] h-[170px] bg-[var(--modal-bg-color)] rounded-full flex flex-col items-center justify-center shadow-xl">
                    <div className="font-bold text-[100px] leading-none">{activeMonth}</div>
                    <div className="font-bold">months</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MonthProgressBar