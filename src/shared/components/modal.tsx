'use client'
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  clickClose: () => void;
  children: React.ReactNode;
  size?: SizeForModal,
  type?: TypeOfModal,
  className?: string,
};



export enum TypeOfModal {
  default = "DEFAULT",
  withoutTitle = "WITHOUT_TITLE"
}


export enum SizeForModal {
  sm = "w-[325px]",
  md = 'w-[400px]',
  lg = 'w-[550px]',
  xl = "w-[750px]",
  xxl= "w-[900px]",
  xxxl= 'w-[1100px]',
  
}
function Modal({ title, clickClose, children, size = SizeForModal.lg, type = TypeOfModal.default, className }: Props) {

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          clickClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
  return (
    <div className={cn("bg-[#00000062] fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center", className)}>
      <AnimatePresence>
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`${size} bg-[var(--modal-bg-color)] rounded-2xl box-border shadow-lg`}
        >
          <div  className="flex relative p-5 justify-center items-center">
            <X className="absolute left-5 cursor-pointer" onClick={clickClose} size={20} />
            {type !== TypeOfModal.withoutTitle &&  <div className="font-bold text-[17px]">{title}</div>}
          </div>
          {type !== TypeOfModal.withoutTitle && <div className="w-full h-[1px] bg-[var(--line-color)]"></div>}
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Modal;
