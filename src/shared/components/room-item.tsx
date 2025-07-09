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
import ApartmentMap from './apartment-map'
import { useRoomInformation } from '@/hooks/useRoomInformation'

type Props = {
    id: number
}

function RoomItem({ id }: Props) {
    const roomItem = useCardListStore().cardList.find(el => el.id === id)!;
    const [isOpen, setIsOpen] = useState(false);
    const [isShareOpen, setisShareOpen] = useState(false);
    const {guestDatas, setDates, handleGuestDatas: setGuestData, dates} = useRoomInformation();
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
                <div className="grid grid-cols-[13fr_7fr] gap-[70px] py-8">
                    <RoomItemInformations dates={dates} setDates={setDates} roomItem={roomItem}/>
                    <RoomItemPrice guestDatas={guestDatas} setDates={setDates} dates={dates} setGuestData={setGuestData} price={roomItem.price}/>
                </div>
                <div className="h-[1px] w-full bg-[var(--line-color)]"></div>
            </div>
            <div id='Reviews' className="">
                {/* https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png for 5 percent of owners */}
                {/* https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png for between 4.9 and 5 */}

                
            </div>
            <div id='Location' className="Map scroll-mt-[89px]">
                <div className="py-11 text-[22px] font-semibold">Where you’ll be</div>
                <div className="w-full h-[500px] rounded-2xl">
                    <ApartmentMap className='rounded-3xl' cardList={[roomItem]} mapCenter={[roomItem.coordinates.lat, roomItem.coordinates.lng]}/>
                </div>
            </div>
            <div className="h-[1000px]"></div>
        </div>
       
    );
}

export default RoomItem;
