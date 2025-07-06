import React from 'react'
import Input from './input'
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type Props = {
    placeHolder: string,
    defaultValue?: string,
    title: string,
    disabled?: boolean,
    className?: string,
    value?: string,
    clickToX?: (id: number) => void,
}

function InputTitle({placeHolder, title, className, disabled, value, clickToX}: Props) {
     

  return (
    <div className={cn('py-2 px-5 rounded-full transition duration-300', className)}>
        <p className={cn('text-[13px] text-[var(--text-color)] font-medium')}>{title}</p>
        <div className={cn('relative h-full')}>
            <Input disabled={disabled} className={cn('p-0 w-full')} placeholder={placeHolder} value={value} onChange={(e) => console.log(e)}/>
            <div 
            className={cn("w-[20px] h-[20px] rounded-full -translate-y-1/3 translate-x-1/3 transition-all duration-300  absolute top-0 right-0 hover:bg-gray-100 dark:hover:bg-[#535353] cursor-pointer hidden"
            )}>
                <X className='w-[14px] h-[14px]'/>
            </div>
        </div>
    </div>
  )
}

export default InputTitle