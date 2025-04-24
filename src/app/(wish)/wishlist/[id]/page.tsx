"use client"

import { cn } from '@/lib/utils'
import { Header } from '@/shared/components'
import Container, { SizeOfContainer } from '@/shared/components/container'
import WishBlockPage from '@/shared/components/wish-block-page'
import { Size } from '@/shared/ui/chevron-click'
import { useFavoritesStore } from '@/store/favorites'
import { ChevronLeft, Ellipsis } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
  params: Promise<{ id: string }>
}

async function WishBlock({ params }: Props) {
  const { id } = await params;
 

  return (
    <>
     <WishBlockPage id={id as unknown as number}/>
    </>
  )
}

export default WishBlock
