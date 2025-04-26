"use client"

import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import { CardItem } from '@/store/cards'
import { HeartIcon, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import ChevronCLick, { ChevronType } from '../ui/chevron-click'
import PointersCard from '../ui/pointers-card'

type Props = {
    cardItem: CardItem,
    clickToFav?: (id: number) => void,
    inFavList?: (id: number) => boolean
}

function Card({cardItem, clickToFav, inFavList}: Props) {
   
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
        <div onClick={() => router.push(`/rooms/${cardItem.id}`)} className="w-full relative overflow-hidden rounded-2xl group cursor-pointer">
            <div 
                className={`flex w-full  transition-all duration-300  scrollbar-none`}
                style={{ transform: `translateX(-${(thisPage - 1) * 100}%)` }}
            >
                {
                    cardItem.images.map((image, index) => (
                        <img src={image} key={index} className='w-full aspect-[4/4] flex-none  object-cover ' alt="" />
                    ))
                }
            </div>
            <div className="absolute top-4 right-4 cursor-pointer hover:scale-105" onClick={(e) => {   
                e.stopPropagation();
                clickToFav?.(cardItem.id)}}>
                    <HeartIcon className={cn(` text-white stroke-[1.5px]`, 
                        !inFavList?.(cardItem.id)?'fill-[#0000007c]':'fill-red-500'
                    )} size={25}/>
            </div>
            <PointersCard defineLocation={defineLocation} cardItem={cardItem} clickPoint={clickPoint} thisPage={thisPage} defineSize={defineSize}/>
            <div className="w-full absolute top-[47%] transition-all duration-300 opacity-0 group-hover:opacity-100">
                <div className="flex w-full px-4 box-border justify-between">
                    {thisPage != 1 ?
                        <ChevronCLick handleChevronBtn={clickPrev} type={ChevronType.left}/>
                        :
                        <div className=""></div>
                    }

                    {thisPage !== cardItem.images.length ?
                         <ChevronCLick handleChevronBtn={clickNext} type={ChevronType.right}/>
                        :
                        <div className=""></div>
                    }
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-[2px]">
            <div className="flex justify-between items-center  mt-2">
                <div className="font-bold">{cardItem.place}</div>
                <div className="flex justify-center items-center gap-1"> <Star className='fill-black' size={15}/> <div className="">{cardItem.rate}</div></div>
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