import Container from '@/shared/components/container'
import React from 'react'

type Props = {
    params: {
        id: number
    }
}

function page({params}: Props) {
  return (
    <Container>
        <div className='font-bold text-[25px]'>Card number {params.id}</div>
    </Container>
  )
}

export default page