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
    <input {...props} value={value}  className={cn(
        'py-5 px-7 text-[15px] box-border bg-transparent text-[var(--text-color)] transition duration-300  cursor-pointer placeholder-[var(--text-gray-color)]',
        'overflow-hidden whitespace-nowrap text-ellipsis',
        {
          "outline-none": variant === InputVariant.search,
          "border border-[var(--line-color)] rounded-lg": variant === InputVariant.outline,
          'pointer-events-none': disabled
        },
        className)} />
  )
}

export default  Input