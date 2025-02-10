import React from 'react'

type Props = {
    className?: string
}

export const Logo = ({ className }: Props) => {
  return (
    <>
            <img src="/logo_img.png" className={className} alt="Logo" />
    </>
  )
}
