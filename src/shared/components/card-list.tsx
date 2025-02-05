"use client"

import React from 'react'
import Card from './card'
import { useFavorites } from '@/hooks/useFavorites'
import { useCardListStore } from '@/store/cards';

type Props = {}

function CardList({}: Props) {
    const {favoriteItems, handleFav} = useFavorites();
    const cards = useCardListStore();
  return (
    <div className="grid grid-cols-5 gap-6">
        {
            cards.cardList.map(card => 
                <Card key={card.id} cardItem={card} favoriteItems={favoriteItems} handleFav={handleFav}/>
            )
        }
    </div>
  )
}

export default CardList