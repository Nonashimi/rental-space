
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import { CardItem } from '@/store/cards'
import { Dot, HeartIcon, StarIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import ChevronCLick, { ChevronType, Size } from '../ui/chevron-click'
import PointersCard from '../ui/pointers-card'
import { useFavoritesStore } from '@/store/favorites'

type Props = {cardItem: CardItem}

function CardClusterPopup({cardItem}: Props) {
    const router = useRouter();
    const images = cardItem.rooms.flatMap(room => room.images);
    const {thisPage, clickPrev, clickNext, clickPoint} = usePagination({maxPages: images.length});
    const {inFavList, clickToFav} = useFavoritesStore();
    const defineLocation = () => {
        if(thisPage <= 3)
            return 0;
        else if(thisPage > 3 && thisPage <= images.length - 3)
            return thisPage - 3;
        else
            return images.length - 5;
        
    }

    const defineSize = (index: number) => 1 - Math.abs(thisPage - (index + 1)) / 10;


    


  return (
    <div className='bg-white dark:bg-[#2e2d2d] rounded-xl shadow-lg flex gap-2'>
        <div onClick={() => router.push(`/rooms/${cardItem.id}`)} className="w-[240px] h-[130px] relative overflow-hidden rounded-lg group cursor-pointer">
            <div 
                className={`flex w-full  transition-all duration-300  scrollbar-none`}
                style={{ transform: `translateX(-${(thisPage - 1) * 100}%)` }}
            >
                {
                    images.map((image, index) => (
                        <img src={image} key={index} className='w-full h-full flex-none  object-cover ' alt="" />
                    ))
                }

            </div>
            <div className="absolute top-2 right-2">
                    <div className="flex gap-2">
                        <div  onClick={(e) => {   
                e.stopPropagation();
                clickToFav?.(cardItem.id)}} className="cursor-pointer w-[25px] h-[25px] rounded-full bg-white  flex justify-center items-center opacity-90 hover:scale-105 hover:opacity-100">
                            <HeartIcon className={cn(``, 
                                !inFavList?.(cardItem.id)?'fill-transparent text-black':'fill-red-500 text-red-500'
                            )} size={14}/>
                        </div>
                    </div>   
            </div>
            <PointersCard defineLocation={defineLocation} cardItem={cardItem} clickPoint={clickPoint} thisPage={thisPage} defineSize={defineSize}/>
            <div className="w-full absolute top-[47%] transition-all duration-300 opacity-0 group-hover:opacity-100">
                <div className="flex w-full px-2 box-border justify-between">
                    {thisPage != 1 ?
                        <ChevronCLick handleChevronBtn={clickPrev} type={ChevronType.left} size={Size.minimal}/>
                        :
                        <div className=""></div>
                    }

                    {thisPage !== images.length ?
                         <ChevronCLick handleChevronBtn={clickNext} type={ChevronType.right} size={Size.minimal}/>
                        :
                        <div className=""></div>
                    }
                </div>
            </div>
        </div>
        <div className="flex flex-col p-2 ">
            <div className="flex justify-between">
                <div className="font-bold text-[15px] text-[var(--text-color)]">{cardItem.place}</div>
                <div className="flex gap-1 text-[var(--text-color)]"> <StarIcon className='fill-[var(--bg-color)]' size={15}/> {cardItem.total_rating}</div>
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


export default CardClusterPopup