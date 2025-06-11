import React from 'react'
import Input from './input'
import { cn } from '@/lib/utils';
import { TypeState } from '@/store/search-type';
import { TypeOfDate, useSearchDatasStore } from '@/store/search-datas';
import { X } from 'lucide-react';

type Props = {
    placeHolder: string,
    defaultValue?: string,
    title: string,
    disabled?: boolean,
    type: TypeState,
    isScrolled: boolean | undefined,
    inputId: number,
    className?: string,
    value?: string,
    inputClassName?: string,
    clickToX: (id: number) => void,
}

function SearchInput({placeHolder, title, type, isScrolled, inputId, className, disabled, value, inputClassName, clickToX}: Props) {
    
    const {setActiveDate} = useSearchDatasStore();
    const {dateType} = useSearchDatasStore();
    const getClassNameInput = (id: number) => {
        return cn({"p-3": isScrolled}, {"bg-white shadow-lg": type.isFocus && id === type.typeId}, className);
    }

    const clickToInput = () => {
        type.setTypeId(inputId);
        type.setFocus(true);
        if(inputId === 2){
            setActiveDate(TypeOfDate.checkIn);
        }else if(inputId === 3){
            setActiveDate(TypeOfDate.checkOut);
        }
        if(inputId === 4){
            if(dateType === 1){
                type.setTypeId(2);
            }else if(dateType === 2){
                type.setTypeId(4);
            }
        }
    }

    const isShowX = () => {
        return (type.isFocus && inputId === type.typeId) && value &&  value.length > 0;
    }

     

  return (
    <div onClick={clickToInput} className={cn('py-3 px-5 rounded-full transition duration-300', getClassNameInput(inputId), {'hover:bg-[#ebebeb]':!type.isFocus})}>
        <p className={cn('text-[13px] text-[#222] font-medium', {'font-semibold flex justify-center': isScrolled})}>{title}</p>
        <div className={cn('relative h-full', inputClassName)}>
            {
                !isScrolled && <Input disabled={disabled} className={cn('p-0 w-full')} placeholder={placeHolder} value={value} onChange={(e) => console.log(e)}/>
            }
            <div 
            onClick={(e) =>{e.stopPropagation(); clickToX(inputId)}}
            className={cn("w-[20px] h-[20px] rounded-full -translate-y-1/3 translate-x-1/3 transition-all duration-300  absolute top-0 right-0 hover:bg-gray-100 cursor-pointer hidden",
                {'flex justify-center items-center': isShowX()}
            )}>
                <X className='w-[14px] h-[14px]'/>
            </div>
        </div>
    </div>
  )
}

export default SearchInput