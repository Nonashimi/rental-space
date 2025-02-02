import React from 'react'

type Props = {
    children: React.ReactNode
}

function Container({children}: Props) {
  return (
    <div className='w-[1400px] mx-auto'>
        {children}
    </div>
  )
}

export default Container