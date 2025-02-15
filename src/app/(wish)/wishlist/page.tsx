"use client"

import { useModal } from '@/hooks/useModal';
import Container, { SizeOfContainer } from '@/shared/components/container'
import Modal, { SizeForModal } from '@/shared/components/modal';
import WishBlock, { FavSize } from '@/shared/components/wish-block';
import Button, { VariantsOfButton } from '@/shared/ui/button';
import { useFavoritesStore } from '@/store/favorites'
import { X } from 'lucide-react';
import React from 'react'

type Props = {}

function WishPage({}: Props) {
    const {favBlockList, deleteBlockFromList} = useFavoritesStore();
    const [id, setId] = React.useState(0);
    const completeModal = useModal();
    const openModal = (id: number) => {
        setId(id);
        completeModal.clickOpen();
    }

    const deleteAndCLose = (id: number) => {
        deleteBlockFromList(id);
        completeModal.clickClose();
    }
  return (
    <Container size={SizeOfContainer.md}>
        {
            completeModal.isOpen && (
                <Modal size={SizeForModal.sm} title="Удалить вишлист?" clickClose={completeModal.clickClose}>
                    <div className="w-full h-[1px] bg-gray-200"></div>
                    <div className="p-7 text-[#6e6d6d] text-center font-semibold">
                        Вишлист «{favBlockList.find((el) => el.id === id)?.title}» будет удален без возможности восстановления.
                    </div>
                    <div className="w-full h-[1px] bg-gray-200"></div>
                    <div className="py-5 px-7 flex justify-between">
                        <Button className='py-3' variant={VariantsOfButton.transparent} onClick={completeModal.clickClose}>Отменить</Button>
                        <Button className='py-3' variant={VariantsOfButton.filling} onClick={() => deleteAndCLose(id)}>Удалить</Button>
                    </div>
                </Modal>
            )
        }
       
        <h2 className='font-bold text-[33px] py-11'>Вишлисты</h2>
        <div className="grid grid-cols-4 gap-5">
            {
                favBlockList.map((block) => (
                    <div key={block.id} className="relative group">
                        <div onClick={() => openModal(block.id)}  className="absolute cursor-pointer left-5 top-5 w-[30px] h-[30px] rounded-full transition-all duration-300 bg-white flex justify-center items-center opacity-0   group-hover:opacity-80 hover:scale-105 hover:!opacity-100">
                            <X size={20}/>
                        </div>
                        <WishBlock size={FavSize.md}  block={block}/>
                    </div>
                ))
            }
        </div>
    </Container>
  )
}

export default WishPage