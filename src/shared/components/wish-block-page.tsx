"use client"
import React, { useEffect, useState } from 'react'
import { Header } from './header'
import { SizeOfContainer } from './container'
import { useFavoritesStore } from '@/store/favorites'
import { ChevronLeft, Ellipsis } from 'lucide-react'

type Props = {
    id: number
}

function WishBlockPage({id}: Props) {
     const [sidePadding, setSidePadding] = useState<number>(0)
      const favoriteBlock  = useFavoritesStore((state) => state.favBlockList.find((block) => block.id === Number(id)));
      useEffect(() => {
        const widthClass = SizeOfContainer.lg as unknown as string
        const matchResult = widthClass.match(/\d+/)
        const blockWidth = matchResult ? parseInt(matchResult[0], 10) : 0
        const padding = (window.innerWidth - window.innerWidth * blockWidth/100) / 2
        setSidePadding(padding)
      }, []);
  return (
    <>
    <Header size={SizeOfContainer.lg} hasSearch={false} />
    <div style={{ marginLeft: sidePadding }}>
          <div className="flex relative">
              <div className="w-[60%] h-screen bg-[#f0f0f0] mr-5 mt-5">
                  <div className="flex justify-between items-center">
                      <ChevronLeft/>
                      <Ellipsis/>
                  </div>
                  <div className="">
                      {favoriteBlock?.title}
                  </div>
              </div>
              <div className="flex-1 h-screen bg-green-500">свым</div>
          </div>
    </div>
  </>
  )
}

export default WishBlockPage