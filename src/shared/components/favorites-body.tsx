import React from 'react'
import Button, { Variants } from '../ui/button'
import { useCardListStore } from '@/store/cards'
import { FavBlock } from '@/store/favorites';
import non_image from "../../../public/non-image.png";
type Props = {
    favBlockList: FavBlock[],
    chooseOneOfBlocks: (id: number) => void,
    clickCreateButton: () => void,
}


function FavoritesBody({favBlockList, chooseOneOfBlocks, clickCreateButton}: Props) {
    const {cardList} = useCardListStore();
    const checkForImage = (block: FavBlock) => {
        if(block.favoriteItems.length === 0){
            return "https://i.pinimg.com/736x/3a/33/23/3a3323a0ef3f90c2b5b176e5874ae13a.jpg";
        }
        return cardList[block.favoriteItems[0]].images[0];
    }
  return (
    <div className=''>
        <div className="max-h-[71vh] h-[71vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 p-7">
                {favBlockList.map((block) => (
                    <div key={block.id} className="flex flex-col gap-[10px] cursor-pointer" onClick={() => chooseOneOfBlocks(block.id)}>
                        <div className="shadow-[0_4px_10px_rgba(0,0,0,0.2)] rounded-2xl w-full h-[235px] box-border p-[6px]">
                            <img className='rounded-xl w-full h-full object-cover' src={checkForImage(block)} alt="" />
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