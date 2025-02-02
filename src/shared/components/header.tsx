import React from 'react'
import { Logo } from '../ui'
import { cn } from '@/lib/utils'
import Container from './container'
import Search from '../ui/Search'
import { UserCircleIcon } from 'lucide-react'

type Props = {
    className?: string
}

export const  Header = ({className}: Props) => {
  return (
    <>
     <Container>
      <header className={
        cn(className, 'flex justify-between py-5 items-center')
        }>
            <Logo/>
            <Search/>
            <UserCircleIcon/>
      </header>
    </Container>
    <div className="w-full h-[1px] bg-gray-300"></div>
    </>
  )
}

