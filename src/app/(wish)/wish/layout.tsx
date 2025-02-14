import { Header } from '@/shared/components'
import { Size } from '@/shared/components/container'
import React from 'react'

type Props = {
    children: React.ReactNode,
}

function Layout({children}: Props) {
  return (
    <div>
        <Header size={Size.md} hasSearch = {false}/>
        {children}
    </div>
  )
}

export default Layout