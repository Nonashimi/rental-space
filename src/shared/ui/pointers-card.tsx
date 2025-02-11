import { cn } from '@/lib/utils';
import { CardItem } from '@/store/cards';
import React from 'react'

type Props = {
    defineLocation: () => number,
    cardItem: CardItem
    clickPoint: (index: number) => void,
    thisPage: number,
    defineSize: (index: number) => number
}

function PointersCard({defineLocation, cardItem, clickPoint, thisPage,defineSize}: Props) {
  return (
    <div className="absolute bottom-4 left-[40%] w-[75px] overflow-hidden">
                <div 
                className="flex gap-[10px] w-[160px] transition-all duration-300"
                style={{ transform: `translateX(-${defineLocation() * 17}px)` }}
                >
                    {Array.from({ length: cardItem.images.length}).map((_, index) => (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                clickPoint(index + 1)}}
                            key={index}
                            className={cn(
                                "w-[7px] h-[7px] rounded-full",
                                index + 1 === thisPage ? "bg-white" : "bg-[#bebbb5]"
                            )}
                            style={{transform: `scale(${defineSize(index)})`}}
                        />
                    ))}
                </div>
            </div>
  )
}

export default PointersCard