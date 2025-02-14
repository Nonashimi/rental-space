"use client"

import React, { useEffect } from 'react'
import Card from './card'
import { useCardListStore } from '@/store/cards';
import Modal from './modal';
import FavoritesBody from './favorites-body';
import FavCreate from './fav-create';
import { TypeOfToaster, useFavoritesStore } from '@/store/favorites';
import toast, { Toast } from 'react-hot-toast';
import ToastCustom from '../ui/toast-custom';

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
      toaster,
      setToaster,
      currentCard,
      lastEditList,
      openAddModal
    } = useFavoritesStore();

    const cards = useCardListStore();

    useEffect(() => {
      switch (toaster) {
        case TypeOfToaster.ItemAddedOrChanged:
          toast.custom((t: Toast) => (
           <ToastCustom 
            t={t} 
            title={favBlockList.find(el => el.id === lastEditList)?.title}
            image={cards.cardList.find(el => el.id === currentCard)?.images[0]}
            clickBtn={openAddModal}
            />
          ));
          break;
        case TypeOfToaster.ItemDeleted:
          toast.custom((t: Toast) => (
            <ToastCustom 
            t={t} 
            title={favBlockList.find(el => el.id === lastEditList)?.title}
            image={cards.cardList.find(el => el.id === currentCard)?.images[0]}
            type={TypeOfToaster.ItemDeleted}
            />
          ));
          break;
        case TypeOfToaster.noneOfThem:
          break;
      }
      setToaster(TypeOfToaster.noneOfThem);

    },[toaster, setToaster]);

    
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