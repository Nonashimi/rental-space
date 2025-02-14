import { cn } from '@/lib/utils'
import { useTypeStore } from '@/store/search-type'
import React from 'react'


export enum InputVariant{
  search = "search",
  outline = "outline",
}
type Props = {
    className?: string,
    value?: string,
    inputId?: number,
    variant?: InputVariant
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({className, value, inputId, variant = InputVariant.search,  ...props}: Props) {
    const type = useTypeStore();
  return (
    <input onFocus={() => type.setTypeId(inputId || 0)} {...props} type="text" value={value}  className={cn(
        'py-5 px-7 text-[15px] box-border bg-transparent text-black transition duration-300  cursor-pointer ', 
        {
          "focus:bg-white focus:shadow-lg outline-none rounded-full hover:bg-[#ebebeb]": variant === InputVariant.search,
          "border border-[#7a7a7a] rounded-lg": variant === InputVariant.outline
        },
        className)} />
  )
}

export default  Input