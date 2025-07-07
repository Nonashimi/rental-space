"use client"
import { useCardListStore } from '@/store/cards'
import React, { useState } from 'react'
import { useToaster } from '@/hooks/useToaster'
import FavModals from './fav-modals'
import { RoomItemTop } from './room-item-top'
import { PhotosModal } from './photos-modal'
import { SharedModal } from './shared-modal'
import { ItemGridPhotos } from './item-grid-photos'
import { RoomItemInformations } from './room-item-informations'
import { RoomItemPrice } from './room-item-price'

type Props = {
    id: number
}

function RoomItem({ id }: Props) {
    const roomItem = useCardListStore().cardList.find(el => el.id === id)!;
    const [isOpen, setIsOpen] = useState(false);
    const [isShareOpen, setisShareOpen] = useState(false);
    
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
            <div className="relative">
                <div id='header-show' className="flag"></div>
                <div className="grid grid-cols-[13fr_7fr] gap-[70px] h-[1500px] py-8">
                    <RoomItemInformations roomItem={roomItem}/>
                    <RoomItemPrice price={roomItem.price}/>
                </div>
            </div>
        </div>
       
    );
}

export default RoomItem;
