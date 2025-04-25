
import WishBlockPage from '@/shared/components/wish-block-page'
import React from 'react'

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
