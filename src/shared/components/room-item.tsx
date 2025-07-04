"use client"
import { useCardListStore } from '@/store/cards'
import React, { useState } from 'react'
import {  Grip, Star } from 'lucide-react'
import { useFavoritesStore } from '@/store/favorites'
import { useToaster } from '@/hooks/useToaster'
import FavModals from './fav-modals'
import { RoomItemTop } from './room-item-top'
import { PhotosModal } from './photos-modal'
import Modal from './modal'
import Button from '../ui/button'
import { title } from 'process'

type Props = {
    id: number
}

function RoomItem({ id }: Props) {
    const roomItem = useCardListStore().cardList.find(el => el.id === id)!;
    const [isOpen, setIsOpen] = useState(false);
    const [isShareOpen, setisShareOpen] = useState(false);
    const images = roomItem.images.slice(0, 5);
    const links = [
    {
        url: 'https://t.me/share/url?url=',
        title: 'Telegram',
        component: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0088cc" viewBox="0 0 24 24">
            <path d="M9.993 15.5c-.356 0-.294-.135-.417-.472L8.5 11.28 18.997 6.5" />
            <path d="M9.993 15.5c.25 0 .36-.115.5-.25l1.25-1.22 2.61 1.96c.48.26.83.12.95-.45l1.72-8.13c.17-.76-.29-1.12-.76-.93l-13.3 5.1c-.9.36-.89.88-.16 1.1l3.4 1.05 7.9-5-5.03 5.64Z" />
        </svg>
        )
    },
    {
        url: 'https://wa.me/?text=',
        title: 'Whatsapp',
        component: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#25D366" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.5 0-9.96 4.44-9.96 9.92 0 1.75.46 3.46 1.33 4.97l-1.4 5.12 5.25-1.38a9.92 9.92 0 0 0 4.78 1.2h.01c5.5 0 9.96-4.45 9.96-9.93C22 6.44 17.54 2 12.04 2zm.08 17.82h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.11.82.83-3.04-.2-.31a7.9 7.9 0 0 1-1.22-4.24c0-4.39 3.58-7.97 7.97-7.97 2.13 0 4.13.83 5.63 2.33a7.93 7.93 0 0 1 2.33 5.64c-.01 4.39-3.59 7.98-7.99 7.98zm4.44-5.96c-.24-.12-1.43-.7-1.65-.77-.22-.08-.39-.12-.55.13-.16.24-.63.77-.77.93-.14.16-.28.17-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.64-1.18-1.43-1.32-1.67-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3 0-.42-.04-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.43h-.48c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.5.1.46-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z"/>
        </svg>
        )
    },
    {
        url: 'https://vk.com/share.php?url=',
        title: 'Vk',
        component: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4C75A3" viewBox="0 0 24 24">
            <path d="M12.02 2C6.49 2 2 6.5 2 12.02c0 5 3.66 9.14 8.44 9.88v-6.99H8.08v-2.9h2.36v-2.2c0-2.35 1.4-3.66 3.55-3.66 1.03 0 2.11.18 2.11.18v2.33h-1.19c-1.17 0-1.54.73-1.54 1.47v1.87h2.62l-.42 2.9h-2.2v6.99c4.78-.74 8.44-4.88 8.44-9.88C22.04 6.5 17.55 2 12.02 2z"/>
        </svg>
        )
    }
    ];

    const handleClick = (text:string, url:string) => {
        const href = window.location.href;
        const encodedUrl = encodeURIComponent(href);
        const encodedText = encodeURIComponent('ghbvdb');
        if(text === 'Telegram'){
            window.location.href = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        }else if(text === 'Whatsapp'){
            window.location.href = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        }else{
            window.location.href = `https://vk.com/share.php?url=${encodedUrl}`;
        }
    };

    const comments = 0;
    useToaster();
    return (
        <div className="">
            <FavModals/>
            {   
                isShareOpen && <Modal clickClose={() => setisShareOpen(false)} title='Share this place'>
                    <div className="p-5 flex flex-col gap-6">
                        <div className="grid grid-cols-8 items-center gap-3">
                            <img className='col-span-1 rounded-xl' src={roomItem.images[0]} alt="" />
                            <div className="col-span-7">{roomItem.place}</div>
                        </div>
                        <div className="grid grid-cols-6 gap-3">
                            {
                                links.map(link => (
                                    <Button key={link.title} onClick={() => handleClick(link.title, link.url)} className='col-span-3'>
                                        <div className="flex gap-2">
                                            <div className="">{link.component()}</div>
                                            <div className="">{link.title}</div>
                                        </div>
                                    </Button>
                                ))
                            }
                        </div>
                    </div>
                </Modal>
            }
            {isOpen && <PhotosModal openShared={() => setisShareOpen(true)} roomItem = {roomItem} id={id} closeModal={() => setIsOpen(false)}/>}
            <RoomItemTop clickOpenShared={() => setisShareOpen(true)} roomItem={roomItem} id={id}/>
            <div className="relative">
                 <div className="grid grid-cols-4 gap-2">
                    <div onClick={() => setIsOpen(true)} className="cursor-pointer col-span-2 row-span-2 aspect-square rounded-tl-2xl rounded-bl-2xl overflow-hidden">
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
                        <div onClick={() => setIsOpen(true)} key={index} className={`cursor-pointer aspect-square overflow-hidden ${roundedClass}`}>
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
