import { cn } from '@/lib/utils'
import { useTypeStore } from '@/store/search-type';
import React from 'react'

type Props = {
    className?: string
    children: React.ReactNode
}

function Box({className, children}: Props) {
    const type = useTypeStore();
  return (
    <div className={cn(className, ' bg-white shadow-2xl rounded-3xl p-10 box-border')}>
        {children}
    </div>
  )
}

export default Box