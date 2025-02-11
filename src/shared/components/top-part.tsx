"use client"

import React, { useEffect, useState } from 'react'
import { Header } from './header'
import Navbar from './Navbar'
import Modal from './modal'
import { useModal } from '@/hooks/useModal'
import FilterBody from './filter-body'
import { useScroll } from '@/hooks/useScroll'

type Props = {

}

function TopPart({}: Props) {
    const {isOpen, clickClose, clickOpen} = useModal();
    const {isScrolled, negativeScroll, positiveScroll} = useScroll();
  return (
    <div className={`sticky top-0 z-10 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      {isOpen &&  <Modal 
      clickClose={clickClose} 
      title="Фильтры">
        <FilterBody/>
      </Modal>}
        <Header negativeScroll={negativeScroll} isScrolled={isScrolled} positiveScroll={positiveScroll}/>
        <Navbar clickOpen={clickOpen}/>
    </div>
  )
}

export default TopPart