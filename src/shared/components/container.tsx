import { cn } from '@/lib/utils'
import React from 'react'


export enum Size {
  sm = "w-[720px]",
  md = 'w-[1120px]',
  lg = 'w-[89%]',
}
type Props = {
    children: React.ReactNode,
    size?: Size
}


function Container({children, size = Size.lg}: Props) {
  return (
    <div className={cn('mx-auto', size)}>
        {children}
    </div>
  )
}

export default Container