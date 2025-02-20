"use client"

import React from 'react'
import Card from './card'
import { useCardListStore } from '@/store/cards';
import { useToaster } from '@/hooks/useToaster';
import { useFavoritesStore } from '@/store/favorites';

type Props = {}

function CardList({}: Props) {

  const {clickToFav, inFavList} = useFavoritesStore();
    const cards = useCardListStore();

    
  return (
    <>
      <div className="grid grid-cols-5 gap-6">
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