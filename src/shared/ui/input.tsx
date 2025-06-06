import { cn } from '@/lib/utils'
import React from 'react'


export enum InputVariant{
  search = "search",
  outline = "outline",
}
type Props = {
    className?: string,
    value?: string,
    variant?: InputVariant,
    disabled?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({className, value, variant = InputVariant.search, disabled,  ...props}: Props) {
  return (
    <input {...props} type="text" value={value}  className={cn(
        'py-5 px-7 text-[15px] box-border bg-transparent text-black transition duration-300  cursor-pointer placeholder-[#6b6b6b]', 
        {
          "outline-none": variant === InputVariant.search,
          "border border-[#7a7a7a] rounded-lg": variant === InputVariant.outline,
          'pointer-events-none': disabled
        },
        className)} />
  )
}

export default  Input