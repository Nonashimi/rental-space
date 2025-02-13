import { cn } from '@/lib/utils'
import React from 'react'


export enum Size {
  sm = "w-[720px]",
  md = 'w-[1120px]',
  lg = 'w-[1700px]',
}
type Props = {
    children: React.ReactNode,
    size?: Size
}


function Container({children, size = Size.lg}: Props) {
  return (
    <div className={cn('mx-auto sm:w-3/4 md:w-[900px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1500px]', size)}>
        {children}
    </div>
  )
}

export default Container