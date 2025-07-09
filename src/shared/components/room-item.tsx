"use client"
import { reviews, useCardListStore } from '@/store/cards'
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
import { CircleCheck, Dot, House, Key, KeyRound, MapPin, MessageSquare, Star, Tag } from 'lucide-react'

type Props = {
    id: number
}

function RoomItem({ id }: Props) {
    const roomItem = useCardListStore().cardList.find(el => el.id === id)!;
    const [isOpen, setIsOpen] = useState(false);
    const [isShareOpen, setisShareOpen] = useState(false);
    const {guestDatas, setDates, handleGuestDatas: setGuestData, dates} = useRoomInformation();
    const room_reviews = reviews.filter(review => roomItem.reviews.some(id => id === review.id));
    const all_rate = [0, 0, 0, 0, 0];

    const toCount = () => {
        const rating = room_reviews.map(room => room.rating);
        rating.forEach(rate => {
            const sum = Object.values(rate).reduce((acc, num) => acc + num, 0);
            const avg = sum / Object.keys(rate).length;
            all_rate[Math.round(5 - avg)]++;
        });
    };
    const criteria = [
    { label: "Cleanliness", value: roomItem.rating.Cleanliness, icon: <House width={35} height={35} /> },
    { label: "Accuracy", value: roomItem.rating.Accuracy, icon: <CircleCheck width={35} height={35} /> },
    { label: "Check-in", value: roomItem.rating.Check_in, icon: <KeyRound width={35} height={35} /> },
    { label: "Communication", value: roomItem.rating.Communication, icon: <MessageSquare width={35} height={35} /> },
    { label: "Location", value: roomItem.rating.Location, icon: <MapPin width={35} height={35} /> },
    { label: "Value", value: roomItem.rating.Value, icon: <Tag width={35} height={35} /> },
    ];


    toCount();
    
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
            <div className="relative z-10">
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
                <div className="">
                    <div className="flex text-[25px] gap-2 items-center py-10">
                        <Star className='fill-[var(--text-color)]'/>
                        <div className="">{roomItem.total_rating}</div>
                        <div className="flex items-center">
                            <Dot/>
                            <div className="">{roomItem.reviews.length} reviews</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 divide-x divide-[var(--line-color)] gap-5">
                        {/* Overall Rating */}
                        <div className="flex flex-col gap-2">
                            <div className="">Overall rating</div>
                            <div>
                            {all_rate.map((rate, i) => {
                                const percent = rate > 0 ? (rate / room_reviews.length) * 100 : 0;
                                return (
                                <div key={i} className="flex gap-3 items-center text-[12px]">
                                    <div>{5 - i}</div>
                                    <div className="w-full h-[3px] bg-[var(--line-color)]">
                                    <div
                                        style={{ width: `${percent}%` }}
                                        className="h-[3px] bg-[var(--text-color)]"
                                    />
                                    </div>
                                </div>
                                );
                            })}
                            </div>
                        </div>

                        {/* Individual Criteria */}
                        {criteria.map((item, index) => (
                            <div key={index} className="flex flex-col justify-between px-5">
                            <div className="flex flex-col gap-1">
                                <div>{item.label}</div>
                                <div className="font-semibold text-[20px]">{item.value}</div>
                            </div>
                            {item.icon}
                            </div>
                        ))}
                    </div>

                </div>
                
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
