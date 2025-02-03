import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children: React.ReactNode,
    className?: string
}

function Button({children, className}: Props) {
  return (
    <button
        className={cn(className, 
            ' py-2 px-4 text-[15px] box-border outline-none rounded-xl bg-transparent text-black transition duration-300 border border-[#ebebeb] hover:border-[#7a7979] cursor-pointer focus:bg-white focus:shadow-lg' 
        )}
    >{children}</button>
  )
}

export default Button