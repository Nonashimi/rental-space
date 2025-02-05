import React from 'react'

type Props = {
    title: string,
    subtitle?: string,
    children: React.ReactNode
}

function FilterVariantBlock({title, children, subtitle}: Props) {
  return (
    <div>
        <div className="text-[18px] font-bold">{title}</div>
        <div className="text-[15px] text-[#646262]">{subtitle}</div>
        <div className="py-3">
            {children}
        </div>
        <div className="w-full h-[1px] bg-[#d3d0d0]"></div>
    </div>
  )
}

export default FilterVariantBlock