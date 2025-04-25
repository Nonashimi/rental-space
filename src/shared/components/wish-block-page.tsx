"use client"
import React, { useEffect, useState } from 'react'
import { Header } from './header'
import { SizeOfContainer } from './container'
import { useFavoritesStore } from '@/store/favorites'
import { ChevronLeft, Ellipsis } from 'lucide-react'
import ApartmentMap from './apartment-map'
import Button, { VariantsOfButton } from '../ui/button'
import { useCardListStore } from '@/store/cards'
import Card from './card'
import { useRouter } from 'next/navigation'

type Props = {
    id: number
}

function WishBlockPage({id}: Props) {
     const [sidePadding, setSidePadding] = useState<number>(0)
     const {favBlockList, inFavList, clickToFav}  = useFavoritesStore();
     const router = useRouter();
     const {cardList} = useCardListStore();
     const favoriteBlock = favBlockList.find((block) => block.id == id)!;
     console.log(favBlockList);
     console.log(favoriteBlock);
     const favCardList = cardList.filter((card) => favoriteBlock.favoriteItems.includes(card.id));
      useEffect(() => {
        const widthClass = SizeOfContainer.lg as unknown as string
        const matchResult = widthClass.match(/\d+/)
        const blockWidth = matchResult ? parseInt(matchResult[0], 10) : 0
        const padding = (window.innerWidth - window.innerWidth * blockWidth/100) / 2
        setSidePadding(padding)
      }, []);

  return (
    <div className='h-screen flex flex-col'>
        <Header size={SizeOfContainer.lg} hasSearch={false} />
        <div className="flex-1 overflow-hidden">
            <div className='h-full' style={{ marginLeft: sidePadding }}>
                <div className="flex relative h-full">
                    <div className="w-[57%] min-w-[57%] pr-5 pt-5 flex flex-col flex-1">
                        <div className="">
                            <div className="flex justify-between items-center">
                                <ChevronLeft className='cursor-pointer' onClick={router.back}/>
                                <Ellipsis/>
                            </div>
                            <div className="font-bold text-[30px] mt-6">
                                {favoriteBlock?.title}
                            </div>
                            <div className="flex gap-2 my-5">
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>Add dates</Button>
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>1 quest</Button>
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>Share</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5 mt-5 h-full overflow-y-scroll hide-scrollbar">
                            {favCardList && 
                                favCardList.map((card) => ( 
                                <Card key={card.id} cardItem={card} clickToFav={clickToFav} inFavList={inFavList}/>
                                ))}
                        </div>
                    </div>
                    <div className="flex-1 flex h-full">
                        <ApartmentMap cardList={favCardList}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WishBlockPage