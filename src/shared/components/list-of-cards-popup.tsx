"use client"
import { CardItem } from '@/store/cards'

import React from 'react'

import CardClusterPopup from './card-cluster-popup'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
    cardItems: CardItem[],
   
}

function ListOfCardsPopup({cardItems}: Props) {
  return (
    <div className=" pt-7 pb-3 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col gap-2 max-h-[270px] overflow-y-scroll px-3">
        {cardItems.map((cardItem) => (
          <CardClusterPopup
            key={cardItem.id}
            cardItem={cardItem}
            />
        ))}
      </div>
      <div  onClick={(e) => {
          e.stopPropagation();
          const popup = document.querySelector(".leaflet-popup");
          if (popup) popup.remove();
          }} className=" absolute top-1 right-1 cursor-pointer w-[30px] h-[30px] rounded-full bg-white  flex justify-center items-center opacity-90 hover:scale-105 hover:opacity-100">
          <X className={cn(``, 
              'fill-transparent text-black'
          )} size={16}/>
      </div>
    </div>
   );
}

export default ListOfCardsPopup