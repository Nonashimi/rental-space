import { cn } from '@/lib/utils'
import React from 'react'


export enum SizeOfContainer {
  sm = "w-[720px]",
  md = 'w-[95%] lg:w-[80%] xl:w-[1120px]',
  lg = 'w-[95%] xl:w-[90%]',
}
type Props = {
    children: React.ReactNode,
    size?: SizeOfContainer,
    className?: string
}


function Container({children, size = SizeOfContainer.lg, className}: Props) {
  return (
    <div className={cn('mx-auto', size, className)}>
        {children}
    </div>
  )
}

export default Container