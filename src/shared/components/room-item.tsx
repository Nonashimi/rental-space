"use client"
import { useCardListStore } from '@/store/cards'
import React, { useState } from 'react'
import {  Grip, Star } from 'lucide-react'
import { useFavoritesStore } from '@/store/favorites'
import { useToaster } from '@/hooks/useToaster'
import FavModals from './fav-modals'
import { RoomItemTop } from './room-item-top'
import { PhotosModal } from './photos-modal'

type Props = {
    id: number
}

function RoomItem({ id }: Props) {
    const roomItem = useCardListStore().cardList.find(el => el.id === id)!;
    const [isOpen, setIsOpen] = useState(false);
    const images = roomItem.images.slice(0, 5);
    const comments = 0;
    useToaster();
    return (
        <div className="">
            <FavModals/>
            {isOpen && <PhotosModal roomItem = {roomItem} id={id} closeModal={() => setIsOpen(false)}/>}
            <RoomItemTop roomItem={roomItem} id={id}/>
            <div className="relative">
                 <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-2 row-span-2 aspect-square rounded-tl-2xl rounded-bl-2xl overflow-hidden">
                        <img
                        className="w-full h-full object-cover hover:opacity-80 transition-all duration-300"
                        src={images[0]}
                        alt=""
                        />
                    </div>

                    {images.slice(1).map((image, index) => {
                        const isTopRight = index === 1;
                        const isBottomRight = index === 3;

                        const roundedClass = isTopRight
                        ? 'rounded-tr-2xl'
                        : isBottomRight
                        ? 'rounded-br-2xl'
                        : '';

                        return (
                        <div key={index} className={`aspect-square overflow-hidden ${roundedClass}`}>
                            <img
                            src={image}
                            className="w-full h-full object-cover hover:opacity-80 transition-all duration-300"
                            alt=""
                            />
                        </div>
                        );
                    })}
                </div>
                <button onClick={() => setIsOpen(true)} className='absolute bottom-5 right-5 bg-[var(--modal-bg-color)] py-1 px-4 shadow-xl rounded-lg flex gap-2 items-center border border-black dark:border-[var(--line-color)]'>
                    <Grip className='w-[17px]'/>
                    <div className="text-[14px] font-bold">Show all photos</div>
                </button>
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
                            <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
                            <div className="flex gap-7 items-center py-4">
                                <img className='w-[40px] h-[40px] rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="" />
                                <div className="flex flex-col">
                                    <div className="text-[16px] font-semibold">Hosted bt Olzhas</div>
                                    <div className="text-[14px] text-gray-500">4 moths hosting</div>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-[var(--modal-bg-color)] w-full h-[100px] rounded-xl shadow-2xl">
                        </div>
                    </div>
            </div>
        </div>
       
    );
}

export default RoomItem;
