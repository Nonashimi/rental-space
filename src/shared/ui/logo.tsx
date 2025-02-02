import React from 'react'

type Props = {
    className?: string
}

export const Logo = ({ className }: Props) => {
  return (
    <>
            <img src="/logoImg.png" className={className} width="120" alt="Logo" />
    </>
  )
}
