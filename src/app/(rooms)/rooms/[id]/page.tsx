
import Container, { SizeOfContainer } from '@/shared/components/container'
import RoomItem from '@/shared/components/room-item'
import { RoomItemHeader } from '@/shared/components/room-item-header'
import RoomTopPart from '@/shared/components/room-top-part'
import React from 'react'
type Props = {
  params: Promise<{ id: string }>
}


async function Page({params}: Props) {
  const id = (await params).id
  return (
    <>
        <RoomTopPart/>
        <RoomItem id={Number(id)}/>
    </>

  )
}

export default Page