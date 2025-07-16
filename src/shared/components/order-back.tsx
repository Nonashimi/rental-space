'use client'
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const OrderBack = () => {
  const router = useRouter();
  return (
     <div onClick={() => router.back()} className=" cursor-pointer w-10 h-10 rounded-full flex justify-center items-center bg-[var(--weak-gray-color)]">
        <ArrowLeft className="w-5" />
      </div>
  );
}