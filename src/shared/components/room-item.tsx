"use client"
import { useCardListStore } from '@/store/cards'
import React from 'react'
import Button, { VariantsOfButton } from '../ui/button'
import { Heart, Send, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavoritesStore } from '@/store/favorites'
import { useToaster } from '@/hooks/useToaster'
import FavModals from './fav-modals'

type Props = {
    id: number
}

function RoomItem({ id }: Props) {
    const roomItem = useCardListStore().cardList.find(el => el.id === id)!;
    const images = roomItem.images.slice(0, 5);
    const favorites = useFavoritesStore();
    const comments = 0;
    useToaster();
    return (
        <div className="">
            <FavModals/>
            <div className="flex py-5 items-center justify-between">
                <div className="text-2xl font-semibold space-x-1">{roomItem.description}</div>
                <div className="flex gap-4">
                    <Button variant={VariantsOfButton.transparent} className='p-2 rounded-lg'>
                    <div className="flex gap-2 items-center">
                            <Send size={15}/>
                            <div className="text-[14px] font-semibold underline">Поделиться</div>
                        </div>
                    </Button>
                    <Button onClick={() => favorites.clickToFav(id)} variant={VariantsOfButton.transparent} className='p-2 rounded-lg'>
                        <div className="flex gap-2 items-center">
                            <Heart className={cn(` stroke-[2px]`, 
                                                    !favorites.inFavList(id)?'':'fill-red-500 text-red-500'
                            )} size={15}/>
                            <div className="text-[14px] font-semibold underline">{favorites.inFavList(id)?'В вишлисте':'Сохранить'}</div>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="w-full h-[55vh] grid grid-cols-2 gap-[10px] rounded-xl overflow-hidden">
                {/* Левая часть (большое изображение) */}
                <div className=" overflow-hidden">
                    <div className="w-full h-full bg-[#000000]">
                        <img className='w-full h-full hover:opacity-80 transition-all duration-300' src={images[0]} alt="" />
                    </div>
                </div>

                {/* Правая часть (4 маленьких изображения) */}
                <div className="grid grid-cols-2 grid-rows-2 h-[55vh] gap-[10px]">
                    {images.slice(1).map((image, index) => (
                            <div key={index} className="w-full h-full bg-[#000000]">
                                <img src={image} className='w-full h-full object-cover hover:opacity-80 transition-all duration-300' alt="" />
                            </div>
                    ))}
                </div>
            </div>
            <div className="info grid grid-cols-[2fr_1fr] gap-[50px] py-8">
                    <div className="">
                        <div className="flex flex-col gap-[2px]">
                            <div className="text-2xl font-semibold">{roomItem.place}</div>
                            <div className="">3 гостя,1 спальня,1кровать,1,5 ванной</div>
                            <div className="flex gap-[5px] items-center">
                                <Star size={17} className='fill-black'/>
                                {
                                    comments > 0 ? (
                                        <div className="font-semibold underline">
                                            {comments} отзыва 
                                        </div>
                                    ): 
                                    (<div className="font-semibold">Пока нету отзывов</div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="my-6">
                            <hr />
                            <div className="flex gap-7 items-center py-4">
                                <img className='w-[40px] h-[40px] rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="" />
                                <div className="flex flex-col">
                                    <div className="text-[16px] font-semibold">Hosted bt Olzhas</div>
                                    <div className="text-[14px] text-gray-500">4 moths hosting</div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-white w-full h-[100px] rounded-xl shadow-2xl border">
                        </div>
                    </div>
            </div>
        </div>
       
    );
}

export default RoomItem;
