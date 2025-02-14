"use client"

import React from 'react'
import Card from './card'
import { useCardListStore } from '@/store/cards';
import Modal from './modal';
import FavoritesBody from './favorites-body';
import FavCreate from './fav-create';
import { useFavoritesStore } from '@/store/favorites';

type Props = {}

function CardList({}: Props) {
    const { 
      clickToFav, 
      chooseOneOfBlocks, 
      createNewBlock, 
      favBlockList, 
      inFavList, 
      clickCreateButton, 
      switchFromCreateToAdd, 
      isAddModalOpen, 
      isCreateModalOpen,
      closeAddModal,
    } = useFavoritesStore();
    const cards = useCardListStore();
  return (
    <div className="grid grid-cols-5 gap-6">
        {isAddModalOpen &&  <Modal 
      clickClose={closeAddModal} 
      title="Сохранить в вишлист">
        <FavoritesBody clickCreateButton = {clickCreateButton} chooseOneOfBlocks={chooseOneOfBlocks}  favBlockList={favBlockList}/>
      </Modal>}

      {isCreateModalOpen && <Modal
          clickClose={switchFromCreateToAdd}
          title='Создать вишлист'
          >
            <FavCreate createNewBLock = {createNewBlock}/>
          </Modal>
      }
        {
            cards.cardList.map(card => 
                <Card key={card.id} cardItem={card} clickToFav={clickToFav} inFavList = {inFavList}/>
            )
        }
    </div>
  )
}

export default CardList