'use client'
import { useEffect, useState } from "react";
import Container, { SizeOfContainer } from "./container";


export const RoomItemHeader = () => {
  const anchors = [
        {id: 'Photos'},
        {id: 'Amenities'},
        {id: 'Location'},
        {id: 'Reviews'},
    ]

    const handleAnchor = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
    }

    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
      const target = document.getElementById('header-show');
      if (!target) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowHeader(!entry.isIntersecting);
          console.log("dvfb");
        },
        {
          root: null,
          threshold: 0,
          rootMargin: '0px',
        }
      );

      observer.observe(target);

      return () => {
        observer.unobserve(target);
      };
    }, []);


  return showHeader && <header className='bg-[var(--modal-bg-color)] border-b border-[var(--line-color)] sticky top-0 z-[6]'>
              <Container className='flex gap-5' size={SizeOfContainer.md}>
                  {anchors.map((anchor) => 
                      <div onClick={() => handleAnchor(anchor.id)} key={anchor.id} className="py-8 font-semibold cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-0 after:bg-[var(--text-color)] after:transition-all hover:after:w-full">
                          {anchor.id}
                      </div>
                  )}
              </Container>
          </header>
}