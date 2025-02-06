import React, { useState } from 'react'
import FilterVariantBlock from './filter-variant-block'
import FilterBtns from './filter-btns'
import FilterSlidebar from './filter-slidebar'
import { Minus, Plus } from 'lucide-react'

type Props = {}

function FilterBody({}: Props) {
  const [price, setPrice] = useState({min: 5000, max: 100000});
  const maxVal = 100000;
  const minVal = 5000;
  const changeMinValuePercentage = (percent: number) => {
    const newMinValue = Math.round(minVal + ((maxVal - minVal)* (percent/100)))
    setPrice({ min: newMinValue, max: price.max });
  }
  const changeMaxValuePercentage = (percent: number) => {
    const newMaxValue = Math.round(maxVal - ( (maxVal - minVal ) * (100 - percent )/100));
    setPrice({ min: price.min, max: newMaxValue });
  }


  return (
    <div>
        <FilterVariantBlock 
          title='Тип размещения'>
            <FilterBtns/>
        </FilterVariantBlock>
        <FilterVariantBlock
            title='Ценовой диапазон'
            subtitle='Цены за ночь без учета налогов и сборов'
        >
            <FilterSlidebar 
              price={price} 
              changeMinByPercent = {changeMinValuePercentage} 
              changeMaxByPercent = {changeMaxValuePercentage}
              />
        </FilterVariantBlock>
        <FilterVariantBlock title='Комнаты и кровати'>
          <div className="flex flex-col gap-5">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="flex justify-between items-center">
                  <div className="text-[#585555] font-bold">Спальни</div>
                  <div className="flex gap-3 items-center">
                    <div className="w-[35px] h-[35px] rounded-full border flex justify-center items-center border-[#646262] cursor-pointer"><Minus className='text-[#646262]' size={18}/></div>
                    <div className="">Неважно</div>
                    <div className="w-[35px] h-[35px] rounded-full border flex justify-center items-center border-[#646262] cursor-pointer"><Plus className='text-[#646262]' size={18}/></div>
                  </div>
                </div>
                ))}
          </div>
           
        </FilterVariantBlock>
    </div>
  )
}

export default FilterBody