import { Header } from '@/shared/components'
import { SizeOfContainer } from '@/shared/components/container'
import React from 'react'

type Props = {
    children: React.ReactNode,
}

function Layout({children}: Props) {
  return (
    <div>
        {children}
    </div>
  )
}

export default Layout