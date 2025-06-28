import React from 'react'
import Button, { VariantsOfButton } from '../ui/button'
import { useCardListStore } from '@/store/cards'
import { FavBlock } from '@/store/favorites';
import non_image from "../../../public/non-image.png";
import WishBlock from './wish-block';
type Props = {
    favBlockList: FavBlock[],
    chooseOneOfBlocks: (id: number) => void,
    clickCreateButton: () => void,
}


function FavoritesBody({favBlockList, chooseOneOfBlocks, clickCreateButton}: Props) {
  return (
    <div className=''>
        <div className="max-h-[71vh] h-[71vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 p-7">
                {favBlockList.map((block) => (
                    <WishBlock key={block.id} clickForCard={chooseOneOfBlocks} block={block}/>
                ))}
            </div>
        </div>
        <div className="">
            <div className="w-full h-[1px] bg-[var(--line-color)]"></div>
            <div className="flex p-5">
                <Button onClick={clickCreateButton} className='w-full py-3' variant={VariantsOfButton.filling}>Создать новый вишлист</Button>
            </div>
        </div>
        
    </div>
  )
}

export default FavoritesBody