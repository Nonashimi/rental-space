import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import React from 'react'


export enum Variants{
  default = 'default',
  filling = "filling",
  transparent = "transparent"
}
type Props = {
    children: React.ReactNode,
    className?: string,
    variant?: Variants,
    loading?: boolean
}& React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({children, className,variant = Variants.default , loading, ...props}: Props) {
  return (
     <button 
        {...props}
        className={cn(
            'p-4 relative text-[16px] box-border outline-none rounded-xl bg-transparent  transition duration-300 border   cursor-pointer ',
          {
            
            "text-black border-[#ebebeb] hover:border-[#7a7979] focus:bg-white": variant === Variants.default,
            "bg-[#b233fc] text-white font-bold hover:bg-[#aa2df3]": variant === Variants.filling,
            "bg-transparent font-bold border-none p-2 hover:bg-[#f1f0f0]": variant === Variants.transparent,
            "bg-[#afabab] text-[#afabab] hover:bg-[#948f8f] pointer-events-none": loading
          },
          
          className
        )}
      
    >
      {loading? <div className="absolute top-[30%] left-[45%]  animate-spin"><LoaderIcon className='text-white' size={25}/></div>: ""}
      {children}
    </button>
   
  )
}

export default Button