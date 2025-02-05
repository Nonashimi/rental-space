import { X } from 'lucide-react'
import React from 'react'

type Props = {
    title: string,
    clickClose: () => void,
    children: React.ReactNode
}

function Modal({title, clickClose, children}: Props) {
  return (
    <div className=" bg-[#00000062] fixed z-20 top-0 left-0 right-0 bottom-0  flex justify-center items-center">
        <div className=' w-[550px] max-h-[80vh] h-[80vh] bg-white rounded-2xl box-border'>
            <div className="flex relative p-5 justify-center items-center">
                <X className='absolute  left-5 cursor-pointer' onClick={clickClose} size={20}/>
                <div className="font-bold text-[17px]">{title}</div>
            </div>
            <div className="w-full h-[1px] bg-[#d3d0d0]"></div>
            <div className="p-5">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal