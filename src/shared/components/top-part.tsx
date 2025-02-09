"use client"

import React, { useEffect, useState } from 'react'
import { Header } from './header'
import Navbar from './Navbar'
import Modal from './modal'
import { useModal } from '@/hooks/useModal'
import FilterBody from './filter-body'

type Props = {

}

function TopPart({}: Props) {
     const {isOpen, clickClose, clickOpen} = useModal();
     const [isScrolled, setIsScrolled] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 0); // Add shadow when scrolled
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

  return (
    <div className={`sticky top-0 z-10 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      {isOpen &&  <Modal 
      clickClose={clickClose} 
      title="Фильтры">
        <FilterBody/>
      </Modal>}
        <Header />
        <Navbar clickOpen={clickOpen}/>
    </div>
  )
}

export default TopPart