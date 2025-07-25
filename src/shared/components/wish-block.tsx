import { useCardListStore } from '@/store/cards'
import { FavBlock } from '@/store/favorites'
import React from 'react'

type Props = {
    block: FavBlock,
    size?: FavSize,
    clickForCard?: (id: number) => void
}

export enum FavSize{
    sm = "232px",
    md = "280px",
}

function WishBlock({block, size = FavSize.sm, clickForCard}: Props) {

    const {cardList} = useCardListStore();
    const checkForImage = (block: FavBlock) => {
        if(block.favoriteItems.length === 0){
            return "https://i.pinimg.com/736x/3a/33/23/3a3323a0ef3f90c2b5b176e5874ae13a.jpg";
        }
        return cardList.find(card => card.id === block.favoriteItems[0])?.rooms[0].images[0];
    }
  return (
    <div key={block.id} className="flex flex-col gap-[10px] cursor-pointer" onClick={() => clickForCard && clickForCard(block.id)} >
                        <div className={`shadow-[0_4px_10px_rgba(0,0,0,0.2)] dark:bg-[#333232] rounded-2xl w-full box-border p-[6px] lg:min-w-[${size}] lg:min-h-[${size}]`} >
                            <img className={`rounded-xl w-full aspect-square object-cover`} src={checkForImage(block)} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold">{block.title}</div>
                            <div className="text-[var(--text-gray-color)]">Сохранено: {block.favoriteItems.length}</div>
                        </div>
    </div>
  )
}

export default WishBlock