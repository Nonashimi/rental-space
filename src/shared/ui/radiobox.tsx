import { cn } from "@/lib/utils";
import React, { FC } from "react";


type Props = {
  className?: string,
  loading?: boolean,
  disabled?: boolean,
} & React.InputHTMLAttributes<HTMLInputElement>

export const RadioBox:FC<Props> = ({className, loading, disabled, ...props}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input {...props} type="radio" name="option" className="hidden peer" />
      <div className="w-5 h-5 rounded-full border peer-checked:border-[6px] border-gray-400 flex items-center justify-center peer-checked:border-[var(--primary)] peer-checked:bg-[var(--bg-color)] transition">
      </div>
    </label>

  );
}