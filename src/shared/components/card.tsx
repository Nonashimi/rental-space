"use client"

import { usePagination } from '@/hooks/usePagination'
import { AlignLeft, ChevronLeft, ChevronRight, Heart, HeartHandshake, HeartIcon, MoveLeft, Rat, StarHalf, StarIcon } from 'lucide-react'
import React from 'react'

type Props = {}

function Card({}: Props) {
    const cardItem = {
        images: [
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/7e7f4c4a-c496-4844-bd02-44e276b41718.jpeg?im_w=1200&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/1479b1a0-ee19-49a6-94e4-3c43049776c0.jpeg?im_w=720&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/3ac04d3f-b4f5-4d01-8258-8083979c792e.jpeg?im_w=720&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/cd0c1eba-74bd-4d6b-9ec3-20c6dd8b5226.jpeg?im_w=720&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/ac259f95-bc29-4466-89f9-12a97f2b0977.jpeg?im_w=720&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/7e7f4c4a-c496-4844-bd02-44e276b41718.jpeg?im_w=1200&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/1479b1a0-ee19-49a6-94e4-3c43049776c0.jpeg?im_w=720&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/3ac04d3f-b4f5-4d01-8258-8083979c792e.jpeg?im_w=720&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/cd0c1eba-74bd-4d6b-9ec3-20c6dd8b5226.jpeg?im_w=720&im_format=avif",
            "https://a0.muscache.com/im/pictures/miso/Hosting-614375154474735110/original/ac259f95-bc29-4466-89f9-12a97f2b0977.jpeg?im_w=720&im_format=avif",
        ],
        place: "Shangarh(Индия)",
        description: "Национальный парк Большие Гималаи в 13 км",
        date: "3-8 фев.",
        price: 15000,
        rate: 4.8
    }

    const {thisPage, clickPrev, clickNext} = usePagination(cardItem.images.length, 5);

  return (
    <div>
        <div className="w-full relative overflow-hidden rounded-2xl group">
            <div 
                className={`flex w-full  transition-all duration-300`}
                style={{ transform: `translateX(-${(thisPage - 1) * 332}px)` }}
            >
                {
                    cardItem.images.map((image, index) => (
                        <img src={image} key={index} className='w-full h-[310px] flex-none  object-cover ' alt="" />
                    ))
                }`
            </div>
            <div className="absolute top-4 right-4 cursor-pointer">
                    <HeartIcon className="fill-[#0000007c] text-white stroke-[1.5px]" size={25}/>
            </div>
            <div className="w-full absolute top-[47%] transition-all duration-300 opacity-0 group-hover:opacity-100">
                <div className="flex w-full px-4 box-border justify-between">
                    {thisPage != 1 ?
                        <div onClick={clickPrev} className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white opacity-90 cursor-pointer">
                            <ChevronLeft size={20}/>
                        </div>
                        :
                        <div className=""></div>
                    }

                    {thisPage !== cardItem.images.length - 1 ?
                         <div onClick={clickNext} className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-white opacity-90 cursor-pointer">
                            <ChevronRight size={20}/>
                        </div>
                        :
                        <div className=""></div>
                    }
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-[2px]">
            <div className="flex justify-between  mt-2">
                <div className="font-bold">{cardItem.place}</div>
                <div className="flex gap-1"> <StarIcon size={20}/> {cardItem.rate}</div>
            </div>
            <div className="text-[#5e5c5c] overflow-hidden whitespace-nowrap text-ellipsis w-full text-[17px] ">{cardItem.description}</div>
            <div className="text-[#5e5c5c] ">
                {cardItem.date}
            </div>
            <div className="">
                <strong>{cardItem.price}Tg</strong>  ночь
            </div>
        </div>
    </div>
  )
}

export default Card