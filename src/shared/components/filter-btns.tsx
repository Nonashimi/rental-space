import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store/filters';
import React, { useState } from 'react';

type Props = {};
export enum Variant {
    all = "all",
    room = "room",
    house = "house",    
}

function FilterBtns({}: Props) {
    const styles = "w-full flex justify-center py-3 rounded-2xl transition-all duration-100 cursor-pointer hover:bg-[#ebebeb]";
    const active = "bg-[#ebebeb]";
    const {typeOfFilter, setTypeOfFilter} = useFilterStore();
    const variants = [
        { title: "Любой Тип", value: Variant.all },
        { title: "Комната", value: Variant.room },
        { title: "Жилье Целиком", value: Variant.house },
    ];


    const handleVariant = (value: Variant) => {
        setTypeOfFilter(value);
    };


    return (
        <div>
            <div className={`grid w-full p-1 grid-cols-3 border border-[#dfdada] rounded-[20px] relative`}>
                {/* Индикатор активной кнопки */}
                <div
                    className="w-[calc(100%/3-2px)] absolute h-[48px] border-black border-[2px] rounded-2xl top-1 left-1 transition-all duration-100"
                    style={{ transform: `translateX(${variants.findIndex(v => v.value === typeOfFilter) * 100}%)` }}
                ></div>
                {/* Кнопки */}
                {variants.map((variant) => (
                    <button
                        key={variant.value}
                        onClick={() => handleVariant(variant.value)}
                        className={cn(styles, typeOfFilter === variant.value && active)}
                        aria-pressed={typeOfFilter === variant.value}
                    >
                        {variant.title}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterBtns;
