import TopPart from '@/shared/components/top-part'
import React from 'react'
import { Toaster } from "react-hot-toast";

type Props = {
    children: React.ReactNode
}

function layout({children}: Props) {
  return (
    <div>
      <Toaster position="bottom-left" />
      <TopPart/>
        {children}
    </div>
  )
}

export default layout