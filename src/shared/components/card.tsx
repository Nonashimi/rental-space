"use client"

import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import { CardItem } from '@/store/cards'
import {  ChevronLeft, ChevronRight, Heart, HeartHandshake, HeartIcon, MoveLeft, Rat, StarHalf, StarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import ChevronCLick, { ChevronType } from '../ui/chevron-click'
import PointersCard from '../ui/pointers-card'

type Props = {
    favoriteItems: Set<Number>,
    handleFav: (id: number) =>void,
    cardItem: CardItem
}

function Card({favoriteItems, handleFav, cardItem}: Props) {
   
    const router = useRouter();

    const {thisPage, clickPrev, clickNext, clickPoint} = usePagination(cardItem.images.length, 5);
    const defineLocation = () => {
        if(thisPage <= 3)
            return 0;
        else if(thisPage > 3 && thisPage <= cardItem.images.length - 3)
            return thisPage - 3;
        else
            return cardItem.images.length - 5;
        
    }

    const defineSize = (index: number) => 1 - Math.abs(thisPage - (index + 1)) / 10;


    


  return (
    <div>
        <div onClick={() => router.push(`card/${cardItem.id}`)} className="w-full relative overflow-hidden rounded-2xl group cursor-pointer">
            <div 
                className={`flex w-full  transition-all duration-300  scrollbar-none`}
                style={{ transform: `translateX(-${(thisPage - 1) * 100}%)` }}
            >
                {
                    cardItem.images.map((image, index) => (
                        <img src={image} key={index} className='w-full h-[310px] flex-none  object-cover ' alt="" />
                    ))
                }
            </div>
            <div className="absolute top-4 right-4 cursor-pointer" onClick={(e) => {   
                e.stopPropagation();
                handleFav(cardItem.id)}}>
                    <HeartIcon className={cn(` text-white stroke-[1.5px]`, 
                        !favoriteItems.has(cardItem.id)?'fill-[#0000007c]':'fill-red-500'
                    )} size={25}/>
            </div>
            <PointersCard defineLocation={defineLocation} cardItem={cardItem} clickPoint={clickPoint} thisPage={thisPage} defineSize={defineSize}/>
            <div className="w-full absolute top-[47%] transition-all duration-300 opacity-0 group-hover:opacity-100">
                <div className="flex w-full px-4 box-border justify-between">
                    {thisPage != 1 ?
                        <ChevronCLick handleChevronBtn={clickPrev} type={ChevronType.right}/>
                        :
                        <div className=""></div>
                    }

                    {thisPage !== cardItem.images.length ?
                         <ChevronCLick handleChevronBtn={clickNext} type={ChevronType.left}/>
                        :
                        <div className=""></div>
                    }
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-[2px]">
            <div className="flex justify-between  mt-2">
                <div className="font-bold">{cardItem.place}</div>
                <div className="flex gap-1"> <StarIcon size={20}/> {cardItem.rate}</div>
            </div>
            <div className="text-[#5e5c5c] overflow-hidden whitespace-nowrap text-ellipsis w-full text-[17px] ">{cardItem.description}</div>
            <div className="text-[#5e5c5c] ">
                {cardItem.date}
            </div>
            <div className="">
                <strong>{cardItem.price}Tg</strong>  ночь
            </div>
        </div>
    </div>
  )
}

export default Card