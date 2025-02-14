"use client"
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    className?: string
}

export const Logo = ({ className }: Props) => {
  const router = useRouter();
  return (
    <>
            <img onClick={() => router.push("/")} src="/logo_img.png" className={cn("cursor-pointer", className)} alt="Logo" />
    </>
  )
}
