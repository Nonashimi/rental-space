'use client'
import { useEffect, useState } from "react";
import Container, { SizeOfContainer } from "./container";
import Button, { VariantsOfButton } from "../ui/button";

export type Props = {
  fullCount: number,
  price: number
}

export const RoomItemHeader = ({fullCount, price}: Props) => {
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
    const [showPrice, setShowPrice] = useState(false);
   useEffect(() => {
    const target = document.getElementById('header-show');
    const priceElement = document.getElementById('room-item-price');

    if (!target || !priceElement) return;

    const observerHeader = new IntersectionObserver(
      ([entry]) => {
        setShowHeader(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    const observerPrice = new IntersectionObserver(
      ([entry]) => {
        setShowPrice(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observerHeader.observe(target);
    observerPrice.observe(priceElement);

    return () => {
      observerHeader.disconnect();
      observerPrice.disconnect();
    };
  }, []);


  return showHeader && <header className='bg-[var(--modal-bg-color)] border-b border-[var(--line-color)] sticky top-0 z-[6]'>
              <Container className='flex justify-between items-center' size={SizeOfContainer.md}>
                <div className="flex gap-5">
                  {anchors.map((anchor) => 
                      <div onClick={() => handleAnchor(anchor.id)} key={anchor.id} className="py-8 font-semibold cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-0 after:bg-[var(--text-color)] after:transition-all hover:after:w-full">
                          {anchor.id}
                      </div>
                  )}
                </div>
                {showPrice && <div className="flex gap-3">
                  <div className="flex flex-col justify-center">
                    {
                      fullCount === 0 ? 
                      <div className="">Add dates for price</div>:
                      <>
                        <div className="font-bold underline">{price * fullCount}Tg</div>
                        <div className="">for {fullCount} nights</div>
                      </>
                    }
                  </div>
                  {
                    fullCount === 0 ?
                      <Button onClick={() => handleAnchor('room-item-price')} className="rounded-full px-6 py-3" variant={VariantsOfButton.filling}>Check Availability</Button>:
                      <Button className="rounded-full px-12 py-3" variant={VariantsOfButton.filling}>Reserve</Button>
                  }
                </div>}
              </Container>
          </header>
}