import { cn } from '@/lib/utils'
import { useTypeStore } from '@/store/search-type'
import React from 'react'

type Props = {
    className?: string,
    value: string,
    changeValue: (value: string) => void,
    inputId?: number
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({className, value, changeValue, inputId, ...props}: Props) {
    const type = useTypeStore();
  return (
    <input onFocus={() => type.setTypeId(inputId || 0)} {...props} type="text" value={value} onChange={(e) => changeValue(e.target.value)} className={cn(className, 
        'py-5 px-7 text-[15px] box-border outline-none rounded-full bg-transparent text-black transition duration-300 hover:bg-[#ebebeb] cursor-pointer focus:bg-white focus:shadow-lg')} />
  )
}

export default  Input