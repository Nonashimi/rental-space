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
import { q } from 'framer-motion/client'
import { cn } from '@/lib/utils'

type Props = {
    id: number
}

function WishBlockPage({id}: Props) {
     const [sidePadding, setSidePadding] = useState<number>(0)
     const {favBlockList, inFavList, clickToFav}  = useFavoritesStore();
     const router = useRouter();
     const {cardList} = useCardListStore();
     const [isFavTitleHide, setIsFavTitleHide] = useState<boolean>(true);
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

    const element = document.querySelector('.observe-fav-title') as Element;
    if (element) {
        let ticking = false;
        const handleScroll = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const rect = element.getBoundingClientRect();
      
              if (rect.top < 115) {
                setIsFavTitleHide(false);
              } else {
                setIsFavTitleHide(true);
              }
      
              ticking = false;
            });
      
            ticking = true;
          }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
      }



  return (
    <div className='flex flex-col'>
        <Header size={SizeOfContainer.lg} hasSearch={false} className='sticky top-0 z-10 bg-white'/>
        <div className="">
            <div className='' style={{ marginLeft: sidePadding }}>
                <div className="flex relative">
                    <div className="w-[60%] min-w-[60%] pr-5 hide-scrollbar">
                            <div className="sticky top-[92px] z-10 bg-white flex justify-between items-center py-5 ">
                                <div className="flex gap-2 items-center ">
                                    <ChevronLeft className='cursor-pointer' onClick={router.back}/>
                                    <div className={cn("font-bold transform transitian-all duration-300", isFavTitleHide?"translate-y-[10px] opacity-0":"opacity-1 translate-y-[0px]")}>{favoriteBlock?.title}</div>
                                </div>
                                <Ellipsis/>
                            </div>
                            <div className="font-bold text-[30px] mt-2 observe-fav-title">
                                {favoriteBlock?.title}
                            </div>
                            <div className="flex gap-2 py-5 sticky top-[135px] z-10 bg-white">
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>Add dates</Button>
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>1 quest</Button>
                                <Button variant={VariantsOfButton.default} className='rounded-full py-2'>Share</Button>
                            </div>
                        <div className="grid grid-cols-3 gap-5 mt-5">
                            {favCardList && 
                                favCardList.map((card) => ( 
                                <Card key={card.id} cardItem={card} clickToFav={clickToFav} inFavList={inFavList}/>
                                ))}
                        </div>
                    </div>
                    <div className="h-[calc(100vh-90.667px)] w-full sticky top-[90.667px]">
                            <ApartmentMap cardList={favCardList}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WishBlockPage