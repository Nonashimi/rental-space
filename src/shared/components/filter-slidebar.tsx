"use client"
import { cn } from '@/lib/utils';
import React, { useState } from 'react'

type Props = {}

function FilterSlidebar({}: Props) {

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);


  
    const proggressBar = [
        48, 12, 3, 29, 50, 17, 8, 41, 26, 5,
        33, 19, 7, 44, 0, 0, 39, 14, 28, 10,
        50, 2, 36, 27, 11, 9, 42, 23, 32, 15,
        6, 38, 18, 31, 20, 0, 49, 4, 45, 24,
        37, 8, 19, 1, 41, 23, 32, 16, 7, 0
      ];

      const m  = 50;    
      const checkIsInRange = (index: number) => {
        const percentPosition = (index / (proggressBar.length - 1)) * 100;  
        const isInRange = percentPosition >= min && percentPosition <= max;

        return isInRange;
      }
   return(
    <div className="">
        <div className="">
            <div className="w-full px-[20px] box-border h-[50px] flex justify-between items-end">
                {
                    proggressBar.map((item, index) => (
                        <div key={index} style={{height: `${(item/m) * 100}%`}}  className={cn("w-[7px] rounded-t-[2px] transition-all duration-100 bg-[#d3d0d0]", {'bg-[#b233fc]': checkIsInRange(index)})}></div>
                    ))
                }
            </div>
        </div>
        <div className="w-full relative flex flex-col justify-center">
            <div className="w-full h-[2px] bg-[#d3d0d0]"></div>
            <div className="h-[2px] absolute bg-[#b233fc] rounded-md"
            style={{ left: `${min > max ? max : min}%`, right: `${100 - max}%` }}
            ></div>
            <input type="range" defaultValue={`${min}`} onChange={(e) => setMin(Number(e.target.value))} className='custom-range absolute w-full  appearance-none ' />
            <input type="range" defaultValue={`${max}`} onChange={(e) => setMax(Number(e.target.value))} className='custom-range absolute w-full  appearance-none ' />
        </div>
    </div>

   );

}

export default FilterSlidebar