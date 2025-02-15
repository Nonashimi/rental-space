"use client"

import { useFavoritesStore } from '@/store/favorites';
import React from 'react'
import Modal from './modal';
import FavoritesBody from './favorites-body';
import FavCreate from './fav-create';

type Props = {}

function FavModals({}: Props) {
      const { 
          chooseOneOfBlocks, 
          createNewBlock, 
          favBlockList,
          clickCreateButton, 
          switchFromCreateToAdd, 
          isAddModalOpen, 
          isCreateModalOpen,
          closeAddModal,
        } = useFavoritesStore();
    
  return (
    <div>
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
    </div>
  )
}

export default FavModals