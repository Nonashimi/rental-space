import { X } from 'lucide-react'
import React, { ComponentProps, ReactElement } from 'react'

type Props = {
    title: string,
    clickClose: () => void,
    children: React.ReactNode
}


type ModalChildrenProps = ComponentProps<any> & {
    clickClose: () => void;
  };
  

function Modal({title, clickClose, children}: Props) {
   
  return (
    <div className=" bg-[#00000062] fixed z-30 top-0 left-0 right-0 bottom-0  flex justify-center items-center">
        <div className=' w-[550px]  bg-white rounded-2xl box-border'>
            <div className="flex relative p-5 justify-center items-center">
                <X className='absolute  left-5 cursor-pointer' onClick={clickClose} size={20}/>
                <div className="font-bold text-[17px]">{title}</div>
            </div>
            <div className="w-full h-[1px] bg-[#d3d0d0]"></div>
            {React.isValidElement(children) 
            ? React.cloneElement(children, { clickClose } as ModalChildrenProps) 
            : children} 

        </div>
    </div>
  )
}

export default Modal