import React from 'react'
import { Logo } from '../ui'
import { cn } from '@/lib/utils'
import Container from './container'
import Search from '../ui/Search'
import { UserCircleIcon } from 'lucide-react'
import Button, { Variants } from '../ui/button'

type Props = {
    className?: string,
    isScrolled?: boolean,
    negativeScroll: () => void
}

export const  Header = ({className, isScrolled, negativeScroll}: Props) => {
  return (
    <>
     <Container>
      <div className={cn(isScrolled?'max-h-[90px]':'max-h-[200px] pb-6',"flex w-full flex-col items-center relative header-duration")}>
        <header className={
          cn(className, 'flex w-full justify-between py-3 items-center')
          }>
              <Logo className='w-[100px]'/>
              <div className={cn('header-duration flex gap-4',
                isScrolled?'translate-y-[-80px] scale-0 pointer-events-none':''
                )}>
                <Button variant={Variants.transparent}>Жилье</Button>
                <Button variant={Variants.transparent}>Впечатление</Button>
              </div>
              <div className="w-[120px] flex justify-end">
                <UserCircleIcon/>
              </div>
        </header>
        <Search negativeScroll = {negativeScroll} isScrolled = {isScrolled} className = {isScrolled?"absolute translate-y-[-65px]":""}/>
      </div>
    </Container>
    <div className="w-full h-[1px] bg-gray-300"></div>
    </>
  )
}

