"use client"
import { useBooleanHead } from '@/hooks/useBooleanHead';
import React from 'react'
import { SizeOfContainer } from './container';
import { Header } from './header';

type Props = {}

function RoomTopPart({}: Props) {
    const {value, toNegative, toPositive} = useBooleanHead();
  return (
    <Header size={SizeOfContainer.md} isScrolled = {value} negativeScroll={toNegative} positiveScroll={toPositive}/>

  )
}

export default RoomTopPart