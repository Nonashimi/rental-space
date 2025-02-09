import { X } from 'lucide-react'
import React from 'react'
import Button, { Variants } from '../ui/button'
import { useFilterStore } from '@/store/filters'
import { useParams } from 'next/navigation'
import { useParamsDetails } from '@/hooks/useParamsDetails'

type Props = {
    title: string,
    clickClose: () => void,
    children: React.ReactNode
}

function Modal({title, clickClose, children}: Props) {
    const {cleanAll} = useFilterStore();
    const paramsDetails = useParamsDetails();
    const handleShow = () => {
        paramsDetails.handleParams();
        clickClose();
    }
  return (
    <div className=" bg-[#00000062] fixed z-20 top-0 left-0 right-0 bottom-0  flex justify-center items-center">
        <div className=' w-[550px]  bg-white rounded-2xl box-border'>
            <div className="flex relative p-5 justify-center items-center">
                <X className='absolute  left-5 cursor-pointer' onClick={clickClose} size={20}/>
                <div className="font-bold text-[17px]">{title}</div>
            </div>
            <div className="w-full h-[1px] bg-[#d3d0d0]"></div>
            <div className="px-5 max-h-[70vh] overflow-y-scroll">
                {children}
            </div>
            <div className="flex justify-between px-5 py-4 items-center  shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
                <Button onClick={cleanAll} variant={Variants.transparent}>Очистить все</Button>
                <Button onClick={handleShow}  variant={Variants.filling}>Показать 1000+ вариантов</Button>
            </div>
        </div>
    </div>
  )
}

export default Modal