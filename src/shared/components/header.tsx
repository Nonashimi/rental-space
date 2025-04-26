"use client"
import React from 'react'
import { Logo } from '../ui'
import { cn } from '@/lib/utils'
import Container, { SizeOfContainer } from './container'
import Search from '../ui/Search'
import { UserCircleIcon } from 'lucide-react'
import Button, { VariantsOfButton } from '../ui/button'
import { useRouter } from 'next/navigation'

type Props = {
    className?: string,
    isScrolled?: boolean,
    negativeScroll?: () => void,
    positiveScroll?: () => void,
    size?: SizeOfContainer,
    hasSearch?: boolean,
}

export const  Header = ({className, isScrolled, negativeScroll, positiveScroll, size, hasSearch = true}: Props) => {
  const classes = hasSearch? isScrolled?'max-h-[90px]':'max-h-[200px] pb-6': "pb-2";
  const router = useRouter();
  return (
    <div className={className}>
     <Container size={size}>
      <div className={cn(classes,"flex flex-col items-center relative header-duration")}>
        <header className={
          cn(className, 'flex w-full justify-between py-3 items-center relative z-10')
          }>
              <Logo className='w-[100px]'/>
              {
                hasSearch && (
                  <div className={cn('header-duration flex gap-4',
                    isScrolled?'translate-y-[-80px] scale-0 pointer-events-none':''
                    )}>
                    <Button variant={VariantsOfButton.transparent}>Жилье</Button>
                    <Button variant={VariantsOfButton.transparent}>Впечатление</Button>
                  </div>
                )
              }
              <div className="w-[120px] flex justify-end">
                <UserCircleIcon onClick={() => router.push("/wishlist")}/>
              </div>
        </header>
        {
          hasSearch && 
          <Search negativeScroll = {negativeScroll} positiveScroll={positiveScroll} isScrolled = {isScrolled} className = {isScrolled?"absolute translate-y-[-65px]":""}/>
        }
      </div>
    </Container>
    <div className="w-full h-[1px] bg-gray-300"></div>
    </div>
  )
}

