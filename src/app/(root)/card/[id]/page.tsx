import Container from '@/shared/components/container'
import React from 'react'
type Props = {
  params: Promise<{ id: string }>
}


async function Page({params}: Props) {

  const id = (await params).id

  return (
    <Container>
        <div className='font-bold text-[25px]'>Card number {id}</div>
    </Container>
  )
}

export default Page