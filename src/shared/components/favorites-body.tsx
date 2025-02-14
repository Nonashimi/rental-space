import React from 'react'
import Button, { Variants } from '../ui/button'
import { useCardListStore } from '@/store/cards'
import { FavBlock } from '@/store/favorites';

type Props = {
    favBlockList: FavBlock[],
    chooseOneOfBlocks: (id: number) => void,
    clickCreateButton: () => void,
}


function FavoritesBody({favBlockList, chooseOneOfBlocks, clickCreateButton}: Props) {
    const {cardList} = useCardListStore();
  return (
    <div className=''>
        <div className="max-h-[71vh] h-[71vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 p-7">
                {favBlockList.map((block) => (
                    <div key={block.id} className="flex flex-col gap-[10px] cursor-pointer" onClick={() => chooseOneOfBlocks(block.id)}>
                        <div className="shadow-[0_4px_10px_rgba(0,0,0,0.2)] rounded-2xl w-full h-[235px] box-border p-[6px]">
                            <img className='rounded-xl w-full h-full' src={cardList[block.favoriteItems[0]].images[0]} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold">{block.title}</div>
                            <div className="text-[#818080]">Сохранено: {block.favoriteItems.length}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="">
            <div className="w-full h-[1px] bg-gray-200"></div>
            <div className="flex p-5">
                <Button onClick={clickCreateButton} className='w-full py-3' variant={Variants.filling}>Создать новый вишлист</Button>
            </div>
        </div>
        
    </div>
  )
}

export default FavoritesBody