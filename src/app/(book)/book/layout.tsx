import { BookHeader } from '@/shared/components/book-header'
import TopPart from '@/shared/components/top-part'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function layout({children}: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
      <BookHeader/>
        {children}
    </div>
  )
}

export default layout