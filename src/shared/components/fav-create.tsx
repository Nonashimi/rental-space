import React, { useState } from 'react'
import Button, { VariantsOfButton } from '../ui/button'
import Input, { InputVariant } from '../ui/input'

type Props = {
    createNewBLock : (title: string) => void,
}

function FavCreate({createNewBLock}: Props) {
    const [title, setTitle] = useState("");
    const changeTitle = (title: string) => {
        if(title.replace(/ /g, '').length <= 50){
            setTitle(title);
        }
    }

    const clearTitle = () => {
        setTitle("");
    }
  return (
    <div className=''>
    <div className="p-5">
        <Input value={title} onChange={(e) => changeTitle(e.target.value)} variant={InputVariant.outline} className='w-full' placeholder='Имя для нового вишлиста'/>
        <div className="text-[13px] py-1 text-[var(--text-gray-color)] font-bold">
            Символов: {title.replace(/ /g, '').length} из 50
        </div>
    </div>
    <div className="">
        <div className="w-full h-[1px] bg-gray-200"></div>
        <div className="flex p-5 justify-between">
            <Button onClick={clearTitle} className=' py-3' variant={VariantsOfButton.transparent}>Очистить</Button>
            <Button onClick={() => createNewBLock(title)} className=' py-3' variant={VariantsOfButton.filling}>Создать</Button>
        </div>
    </div>
    
</div>
  )
}

export default FavCreate