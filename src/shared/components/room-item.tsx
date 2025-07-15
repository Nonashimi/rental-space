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
import { RoomReviews } from './room-rating-part'
import { RoomItemHeader } from './room-item-header'
import Container, { SizeOfContainer } from './container'
import { useComputionDay } from '@/hooks/useComputionPrice'
import { useOrderDatas } from '@/store/order-datas'
import { useRouter } from 'next/navigation'

type Props = {
    id: number
}

function RoomItem({ id }: Props) {
    const roomItem = useCardListStore().cardList.find(el => el.id === id)!;
    const [isOpen, setIsOpen] = useState(false);
    const [isShareOpen, setisShareOpen] = useState(false);
    const {guestDatas, handleGuestDatas: setGuestData, dates, handleDates} = useRoomInformation();
    const {fullCount} = useComputionDay({dates});
    useToaster();
    const router = useRouter();

    const {actions} = useOrderDatas();

    const handleReserve = () => {
        actions.setDates(dates);
        actions.setGuestData(guestDatas);
        actions.setRoomItem(roomItem);
        router.push(`/book/${id}`);
    };
    return (
        < >
            <RoomItemHeader handleReserve={handleReserve} price={roomItem.price} fullCount={fullCount}/>
            <Container size={SizeOfContainer.md}>
                <FavModals/>
                {   
                    isShareOpen && <SharedModal roomItem={roomItem} handleClose={()=> setisShareOpen(false)}/>
                }
                {isOpen && <PhotosModal openShared={() => setisShareOpen(true)} roomItem = {roomItem} id={id} closeModal={() => setIsOpen(false)}/>}
                <RoomItemTop clickOpenShared={() => setisShareOpen(true)} roomItem={roomItem} id={id}/>
                <div id='header-show' className="">
                    <ItemGridPhotos handleOpen={() => setIsOpen(true)} roomItem={roomItem}/>
                </div>
                <div className="relative z-[5]">
                    <div className="grid grid-cols-[13fr_7fr] gap-[70px] py-8">
                        <RoomItemInformations dates={dates} setDates={handleDates} roomItem={roomItem}/>
                        <RoomItemPrice handleReserve={handleReserve} guestDatas={guestDatas} setDates={handleDates} dates={dates} setGuestData={setGuestData} price={roomItem.price}/>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-[var(--line-color)] my-10"></div>
                <RoomReviews roomItem={roomItem}/>
                <div id='Location' className="Map scroll-mt-[89px]">
                    <div className="pb-11 text-[22px] font-semibold">Where you’ll be</div>
                    <div className="w-full h-[500px] rounded-2xl">
                        <ApartmentMap roomMap={true} className='rounded-3xl' cardList={[roomItem]} mapCenter={[roomItem.coordinates.lat, roomItem.coordinates.lng]}/>
                    </div>
                </div>
                <div className="h-[1000px]"></div>
            </Container>
        </>
       
    );
}

export default RoomItem;
