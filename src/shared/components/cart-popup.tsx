"use client"

import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import { CardItem } from '@/store/cards'
import { Dot, HeartIcon, StarIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import ChevronCLick, { ChevronType } from '../ui/chevron-click'
import PointersCard from '../ui/pointers-card'

type Props = {
    cardItem: CardItem,
    clickToFav?: (id: number) => void,
    inFavList?: (id: number) => boolean
}

function CardPopup({cardItem, clickToFav, inFavList}: Props) {
   
    const router = useRouter();

    const {thisPage, clickPrev, clickNext, clickPoint} = usePagination({maxPages: cardItem.images.length});
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
    <div className='bg-[var(--modal-bg-color)] rounded-2xl shadow-lg'>
        <div onClick={() => router.push(`rooms/${cardItem.id}`)} className="w-[320px] h-[200px] relative overflow-hidden rounded-t-2xl group cursor-pointer">
            <div 
                className={`flex w-full  transition-all duration-300  scrollbar-none`}
                style={{ transform: `translateX(-${(thisPage - 1) * 100}%)` }}
            >
                {
                    cardItem.images.map((image, index) => (
                        <img src={image} key={index} className='w-full h-full flex-none  object-cover ' alt="" />
                    ))
                }

            </div>
            <div className="absolute top-3 right-3">
                    <div className="flex gap-2">
                        <div  onClick={(e) => {   
                e.stopPropagation();
                clickToFav?.(cardItem.id)}} className="cursor-pointer w-[30px] h-[30px] rounded-full bg-white  flex justify-center items-center opacity-90 hover:scale-105 hover:opacity-100">
                            <HeartIcon className={cn(``, 
                                !inFavList?.(cardItem.id)?'fill-transparent text-black':'fill-red-500 text-red-500'
                            )} size={16}/>
                        </div>
                        <div  onClick={(e) => {
                            e.stopPropagation();
                            const popup = document.querySelector(".leaflet-popup");
                            if (popup) popup.remove();
                            }} className="cursor-pointer w-[30px] h-[30px] rounded-full bg-white  flex justify-center items-center opacity-90 hover:scale-105 hover:opacity-100">
                            <X className={cn(``, 
                                'fill-transparent text-black'
                            )} size={16}/>
                        </div>
                    </div>   
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
        <div className="flex flex-col p-2 ">
            <div className="flex justify-between">
                <div className="font-bold text-[15px] text-[var(--text-color)]">{cardItem.place}</div>
                <div className="flex gap-1 text-[var(--text-color)]"> <StarIcon className='fill-black' size={15}/> {cardItem.rate}</div>
            </div>
            <div className="flex gap-[2px] items-center text-[15px]">
                <div className="text-[var(--text-color)]">
                    <strong>{cardItem.price}Tg</strong>  ночь
                </div>
                <div className="text-[var(--text-gray-color)] flex items-center justify-center"><Dot size={10}/></div>
                <div className="text-[var(--text-gray-color)] ">
                    {cardItem.date}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardPopup