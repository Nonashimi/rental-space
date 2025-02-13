import { cn } from '@/lib/utils'
import React from 'react'

export enum Size {
  sm = "w-full max-w-[640px]",   
  md = "w-[720px] max-w-[768px]",
  lg = "w-[900px] max-w-[1024px]",
  xl = "w-[1120px] max-w-[1280px]", 
  '2xl' = "w-[1400px] max-w-[1536px]" 
}

type Props = {
    children: React.ReactNode,
    size?: Size
}

function Container({ children, size = Size.xl }: Props) {
  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      'w-full max-w-[640px] sm:w-[720px]  md:w-[900px lg:w-[1120px]  xl:w-[1000px]',
      size
    )}>
        {children}
    </div>
  )
}

export default Container
