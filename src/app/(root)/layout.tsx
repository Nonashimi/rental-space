import TopPart from '@/shared/components/top-part'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function layout({children}: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
      <TopPart/>
        {children}
    </div>
  )
}

export default layout