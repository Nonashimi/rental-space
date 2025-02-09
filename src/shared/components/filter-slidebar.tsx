"use client"
import { maxVal, minVal } from '@/hooks/usePrices';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

type Props = {
    price: {
        min: number,
        max: number
    },
    changeMinByPercent: (value: number) => void,
    changeMaxByPercent: (value: number) => void,
  
}

function FilterSlidebar({price, changeMaxByPercent, changeMinByPercent}: Props) {

    const [min, setMin] = useState((price.min - minVal)/(maxVal - minVal) * 100);
    const [max, setMax] = useState((price.max - minVal)/(maxVal - minVal) * 100);
    
    useEffect(() => {
        setMin((price.min - minVal)/(maxVal - minVal) * 100);
        setMax((price.max - minVal)/(maxVal - minVal) * 100);
    },[price.min, price.max]);
 
  
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


      const handleMinByPercent = (min: number) => {
        setMin(min);
        changeMinByPercent(min);
      }

      const handleMaxByPercent = (max: number) => {
        setMax(max);
        changeMaxByPercent(max);
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
            <input type="range" value={`${min}`} onChange={(e) => handleMinByPercent(Number(e.target.value))} className='custom-range absolute w-full  appearance-none' />
            <input type="range" value={`${max}`} onChange={(e) => handleMaxByPercent(Number(e.target.value))} className='custom-range absolute w-full  appearance-none ' />
        </div>

        <div className="py-5 flex w-full justify-between">
            <div className="flex w-[20%]  flex-col items-center gap-1">
                <div className="text-[#615f5f] text-[13px] font-[600]">Минимум</div>
                <div  className="w-full p-4 flex justify-center border border-[#e4dcdc] rounded-full">{price.min}tg</div> 
            </div>
            <div className="flex w-[20%]  flex-col items-center gap-1">
                <div className="text-[#615f5f] text-[13px] font-[600]">Максимум</div>
                <div className="w-full p-4 flex justify-center border border-[#e4dcdc] rounded-full">{price.max}tg</div>
            </div>
           
        </div>
    </div>

// Math.round(5000 + ((100000 - 5000 )* (min/100))) 
// Math.round(100000 - ( (95000 ) * (100 - max )/100))
   );

}

export default FilterSlidebar