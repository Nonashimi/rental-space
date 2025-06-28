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
    const styles = "w-full flex justify-center py-3 rounded-2xl transition-all duration-100 cursor-pointer hover:bg-[#ebebeb] dark:hover:bg-[var(--modal-hover-color)]";
    const active = "bg-[#ebebeb] dark:bg-[var(--modal-hover-color)]";
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
            <div className={`grid w-full p-1 grid-cols-3 border border-[var(--line-color)] rounded-[20px] relative`}>
                <div
                    className="w-[calc(100%/3-2px)] absolute h-[48px] border-black dark:border-[#5c5b5b] border-[2px] rounded-2xl top-1 left-1 transition-all duration-100"
                    style={{ transform: `translateX(${variants.findIndex(v => v.value === typeOfFilter) * 100}%)` }}
                ></div>
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
