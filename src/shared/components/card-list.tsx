"use client"

import React from 'react'
import Card from './card'
import { useCardListStore } from '@/store/cards';
import { useFavoritesStore } from '@/store/favorites';

type Props = {}

function CardList({}: Props) {

  const {clickToFav, inFavList} = useFavoritesStore();
    const cards = useCardListStore();

    
  return (
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 mmd:grid-cols-5 md:grid-cols-4 lg:grid-cols-6">
          {
              cards.cardList.map(card => 
                  <Card key={card.id} cardItem={card} clickToFav={clickToFav} inFavList = {inFavList}/>
              )
          }
      </div>
    </>
   
  )
}

export default CardList