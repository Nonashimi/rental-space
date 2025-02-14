import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

type Props = {
  title: string;
  clickClose: () => void;
  children: React.ReactNode;
  size?: SizeForModal,
};


export enum SizeForModal {
  sm = "w-[325px]",
  md = 'w-[550px]',
 
}
function Modal({ title, clickClose, children, size = SizeForModal.md }: Props) {
  return (
    <div className="bg-[#00000062] fixed z-30 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`${size} bg-white rounded-2xl box-border shadow-lg`}
        >
          <div className="flex relative p-5 justify-center items-center">
            <X className="absolute left-5 cursor-pointer" onClick={clickClose} size={20} />
            <div className="font-bold text-[17px]">{title}</div>
          </div>
          <div className="w-full h-[1px] bg-[#d3d0d0]"></div>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Modal;
