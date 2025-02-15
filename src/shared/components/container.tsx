import { cn } from '@/lib/utils'
import React from 'react'


export enum SizeOfContainer {
  sm = "w-[720px]",
  md = 'w-[61%]',
  lg = 'w-[89%]',
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