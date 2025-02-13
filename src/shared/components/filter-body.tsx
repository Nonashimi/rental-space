"use client"

import React from 'react'
import FilterVariantBlock from './filter-variant-block'
import FilterBtns from './filter-btns'
import FilterSlidebar from './filter-slidebar'
import {  Crown, KeyRound, User, WashingMachineIcon, Zap } from 'lucide-react'
import { Wifi, Utensils, WashingMachine, Snowflake, Thermometer } from "lucide-react";
import Button, { Variants } from '../ui/button'
import { useFilterStore } from '@/store/filters'
import { usePrices } from '@/hooks/usePrices'
import { cn } from '@/lib/utils'
import RoomPagination from './room-pagination'
import { useParamsDetails } from '@/hooks/useParamsDetails'


type Props = {
  clickClose?: () => void,
}

function FilterBody({clickClose}: Props) {
  const {prices, changeMinValuePercentage, changeMaxValuePercentage} = usePrices();

  const filters = useFilterStore();
  const amenities = [
    { id: 1, title: "Wi-Fi", component: <Wifi size={20} /> },
    { id: 2, title: "Кухня", component: <Utensils size={20} /> },
    { id: 3, title: "Стиральная машина", component: <WashingMachine size={20} /> },
    { id: 4, title: "Сушильная машина", component: <WashingMachineIcon/> },
    { id: 5, title: "Кондиционер", component: <Snowflake size={20} /> },
    { id: 6, title: "Отопление", component: <Thermometer size={20} /> },
  ];





  const handleAmenities = (id: number) => {
    filters.setAmenities(id);
  };

  const handlePossibility = (id: number) => {
    filters.setPossibility(id);
  };

  const handleIsDemanded = () => {
    filters.setIsDemanded(!filters.isDemanded);
  };

  const bookingOptions = [
    {
      id: 1,
      title: "Мгновенное бронирование",
      component: <Zap size={20} />,
    },
    {
      id: 2,
      title: "Самостоятельное заселение",
      component: <KeyRound size={20} />,
    },
    {
      id: 3,
      title: "Можно с питомцами",
      component: <User size={20} />,
    }
  ];

   const {cleanAll} = useFilterStore();
      const paramsDetails = useParamsDetails();
      const handleShow = () => {
          paramsDetails.handleParams();
          clickClose?.();
      }
  return (
    <div className=''>
      <div className="px-5 max-h-[70vh] overflow-y-scroll">
        <FilterVariantBlock 
          title='Тип размещения'>
            <FilterBtns/>
        </FilterVariantBlock>
        <FilterVariantBlock
            title='Ценовой диапазон'
            subtitle='Цены за ночь без учета налогов и сборов'
        >
            <FilterSlidebar 
              price={prices} 
              changeMinByPercent = {changeMinValuePercentage} 
              changeMaxByPercent = {changeMaxValuePercentage}
              />
        </FilterVariantBlock>
        <FilterVariantBlock title='Комнаты и кровати'>
          <div className="flex flex-col gap-5">
                {filters.rooms.map((room) => (
                  <RoomPagination key={room.id} id = {room.id} title={room.title} count = {room.count} setRooms={filters.setRooms}/>
                ))}
          </div>
        </FilterVariantBlock>
        <FilterVariantBlock title='Удобства'>
          <div className="flex gap-2 flex-wrap">
            {amenities.map((amenity) => (
              <Button onClick={() => handleAmenities(amenity.id)} key={amenity.id} className={cn('rounded-full', filters.amenities.includes(amenity.id) ? 'border border-[#111111]' : '')}>
                <div className="flex gap-2">
                    {amenity.component}
                    {amenity.title}
                  </div>
              </Button>
            ))}
          </div>
        </FilterVariantBlock>
        <FilterVariantBlock title='Возможности бронирования'>
            <div className="flex gap-2 flex-wrap">
              {bookingOptions.map((option) => (
                <Button onClick={() => handlePossibility(option.id)} key={option.id} className={cn('rounded-full p-3', filters.possibility.includes(option.id) ? 'border border-[#111111]' : '')}>
                  <div className="flex gap-2">
                    {option.component}
                    {option.title}
                  </div>
                </Button>
              ))}
            </div>
        </FilterVariantBlock>
        <FilterVariantBlock title='Отличное жилье'>
            <Button onClick={handleIsDemanded} className={filters.isDemanded?"border border-[#111111]":""}>
              <div className="flex gap-2 items-center">
                <Crown size={30}/>
                <div className="flex flex-col">
                  <div className="text-[16px] font-bold">Выбор гостей</div>
                  <div className="text-[14px] text-[#646262] font-semibold w-[150px]">Самoе любимле жилье на Airbnb</div>
                </div>
              </div>
            </Button>
        </FilterVariantBlock>
        </div>
            <div className="flex justify-between px-5 py-4 items-center  shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
                <Button onClick={cleanAll} variant={Variants.transparent}>Очистить все</Button>
                <Button onClick={handleShow}  variant={Variants.filling}>Показать 1000+ вариантов</Button>
            </div>
        </div>
  )
}

export default FilterBody