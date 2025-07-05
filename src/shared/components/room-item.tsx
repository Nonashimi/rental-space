"use client"
import { useCardListStore } from '@/store/cards'
import React, { useState } from 'react'
import { Grip, Star } from 'lucide-react'
import { useToaster } from '@/hooks/useToaster'
import FavModals from './fav-modals'
import { RoomItemTop } from './room-item-top'
import { PhotosModal } from './photos-modal'
import { SharedModal } from './shared-modal'
import { ItemGridPhotos } from './item-grid-photos'

type Props = {
    id: number
}

function RoomItem({ id }: Props) {
    const roomItem = useCardListStore().cardList.find(el => el.id === id)!;
    const [isOpen, setIsOpen] = useState(false);
    const [isShareOpen, setisShareOpen] = useState(false);
    const comments = 0;
    useToaster();
    return (
        <div className="">
            <FavModals/>
            {   
                isShareOpen && <SharedModal roomItem={roomItem} handleClose={()=> setisShareOpen(false)}/>
            }
            {isOpen && <PhotosModal openShared={() => setisShareOpen(true)} roomItem = {roomItem} id={id} closeModal={() => setIsOpen(false)}/>}
            <RoomItemTop clickOpenShared={() => setisShareOpen(true)} roomItem={roomItem} id={id}/>
            <ItemGridPhotos handleOpen={() => setIsOpen(true)} roomItem={roomItem}/>
            <div className="grid grid-cols-[2fr_1fr] gap-[50px] py-8 relative">
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
                <div className="h-full">
                    <div className="sticky top-8">
                            <div className="bg-[var(--modal-bg-color)] w-full h-[100px] rounded-xl shadow-2xl">
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
}

export default RoomItem;
