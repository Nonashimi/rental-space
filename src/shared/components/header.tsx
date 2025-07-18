"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Logo } from '../ui'
import { cn } from '@/lib/utils'
import Container, { SizeOfContainer } from './container'
import Search from '../ui/search'
import { Heart, Menu } from 'lucide-react'
import Button, { VariantsOfButton } from '../ui/button'
import { useRouter } from 'next/navigation'
import Box from './box'

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
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    console.log(target);
    if (target.closest(".menu-btn")) return;
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  if (openMenu) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  // Cleanup
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [openMenu]);

  return (
    <div className={className}>
     <Container size={size}>
      <div className={cn(classes,"flex flex-col items-center relative header-duration")}>
        <header className={
          cn(className, 'flex w-full justify-between py-3 items-center relative z-10')
          }>
              <Logo className='w-[80px] lg:w-[100px]'/>
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
              <div className=" w-[120px] relative flex justify-end">
                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-black text-white text-[13px]">O</div>
                  <div onClick={() => setOpenMenu(!openMenu)} className="w-[40px] h-[40px] menu-btn rounded-full bg-[var(--weak-gray-color)] flex items-center justify-center cursor-pointer hover:bg-[var(--weak-gray-color)] transition-all duration-300">
                    <Menu className='pointer-events-none' width={18}/>
                  </div>
                </div>
              </div>
        </header>
        <div ref={menuRef} className="">
          {
            openMenu && <Box className='p-0 py-3 rounded-xl z-30 w-[250px] h-[100px] absolute top-[70px] right-0 shadow dark:bg-[#222]'>
            <div onClick={() => {router.push('/wishlist')}} className="flex gap-3 px-3 py-1 items-center hover:bg-gray-100 dark:hover:bg-[#302f2f] transition-all duration-300 cursor-pointer">
              <Heart width={16}/>
              <div className="">Wishlists</div>
            </div>
          </Box>
          }
        </div>
        {
          hasSearch && 
          <Search negativeScroll = {negativeScroll} positiveScroll={positiveScroll} isScrolled = {isScrolled} className = {isScrolled?"absolute translate-y-[-57px] lg:translate-y-[-65px]":""}/>
        }
      </div>
    </Container>
    <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
    </div>
  )
}

