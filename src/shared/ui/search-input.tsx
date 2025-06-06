import React from 'react'
import Input from './input'
import { cn } from '@/lib/utils';
import { TypeState } from '@/store/search-type';
import { TypeOfDate, useSearchDatasStore } from '@/store/search-datas';

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
}

function SearchInput({placeHolder, defaultValue, title, type, isScrolled, inputId, className, disabled, value}: Props) {
    
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

  return (
    <div onClick={clickToInput} className={cn('py-3 px-5 rounded-full transition duration-300', getClassNameInput(inputId), {'hover:bg-[#ebebeb]':!type.isFocus})}>
        <p className={cn('text-[13px] text-[#222] font-medium', {'font-semibold flex justify-center': isScrolled})}>{title}</p>
        {
            !isScrolled && <Input disabled={disabled} className='p-0 w-full' placeholder={placeHolder} value={value} onChange={(e) => console.log(e)}/>
        }
    </div>
  )
}

export default SearchInput