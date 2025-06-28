import React from 'react'

type Props = {
    title: string,
    subtitle?: string,
    children: React.ReactNode
}

function FilterVariantBlock({title, children, subtitle}: Props) {
  return (
    <div className='pt-7'>
        <div className="text-[18px] font-bold">{title}</div>
        <div className="text-[15px] text-[var(--text-gray-color)]">{subtitle}</div>
        <div className="py-4">
            {children}
        </div>
        <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
    </div>
  )
}

export default FilterVariantBlock