import ApartmentMap from '@/shared/components/apartment-map'
import Container from '@/shared/components/container'
import React from 'react'
type Props = {
  params: Promise<{ id: string }>
}


async function Page({params}: Props) {

  const id = (await params).id

  return (
    <Container>
      <ApartmentMap/>
    </Container>
  )
}

export default Page