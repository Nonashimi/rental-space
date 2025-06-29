import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import React from 'react'


export enum VariantsOfButton{
  default = 'default',
  filling = "filling",
  transparent = "transparent"
}
type Props = {
    children: React.ReactNode,
    className?: string,
    variant?: VariantsOfButton,
    loading?: boolean,
    disabled?: boolean
}& React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({children, className,variant = VariantsOfButton.default , loading, disabled, ...props}: Props) {
  return (
     <button 
        {...props}
        className={cn(
            'p-4 relative text-[16px] box-border outline-none rounded-xl bg-transparent  transition duration-300 border   cursor-pointer ',
          {
            
            " border-[var(--line-color)] bg-[var(--modal-bg-color)] hover:border-[#7a7979] dark:hover:border-[#444242]": variant === VariantsOfButton.default,
            "bg-[var(--primary)] border-none font-bold hover:bg-[#aa2df3] text-white": variant === VariantsOfButton.filling,
            "bg-[var(--bg-color)] font-bold border-none p-2 hover:bg-[#f1f0f0]  dark:hover:border-[#444242] dark:hover:bg-[#363535]": variant === VariantsOfButton.transparent,
            "bg-[var(--text-gray-color)] text-[var(--text-gray-color)] pointer-events-none": loading,
            "opacity-[0.3] pointer-events-none": disabled
          },
          
          className
        )}

      
    >
      {loading? <div className="absolute top-[30%] left-[45%]  animate-spin"><LoaderIcon className='text-[var(--text-color)]' size={25}/></div>: ""}
      {children}
    </button>
   
  )
}

export default Button