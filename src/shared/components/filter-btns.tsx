import { cn } from '@/lib/utils';
import React, { useState } from 'react';

type Props = {};

function FilterBtns({}: Props) {
    const styles = "w-full flex justify-center py-3 rounded-2xl transition-all duration-100 cursor-pointer hover:bg-[#ebebeb]";
    const active = "bg-[#ebebeb]";
    
    const variants = [
        { title: "Любой Тип", value: "all" },
        { title: "Комната", value: "room" },
        { title: "Жилье Целиком", value: "house" },
    ];

    const [selected, setSelected] = useState("all");

    const handleVariant = (value: string) => setSelected(value);

    return (
        <div>
            <div className={`grid w-full p-1 grid-cols-3 border border-[#dfdada] rounded-[20px] relative`}>
                {/* Индикатор активной кнопки */}
                <div
                    className="w-[calc(100%/3-2px)] absolute h-[48px] border-black border-[2px] rounded-2xl top-1 left-1 transition-all duration-100"
                    style={{ transform: `translateX(${variants.findIndex(v => v.value === selected) * 100}%)` }}
                ></div>
                {/* Кнопки */}
                {variants.map((variant) => (
                    <button
                        key={variant.value}
                        onClick={() => handleVariant(variant.value)}
                        className={cn(styles, selected === variant.value && active)}
                        aria-pressed={selected === variant.value}
                    >
                        {variant.title}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterBtns;
