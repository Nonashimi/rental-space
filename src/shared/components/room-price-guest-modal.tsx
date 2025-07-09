'use client';
import { FC, useEffect, useRef } from "react";
import GuestHandler from "./guest-handler";
import Button, { VariantsOfButton } from "../ui/button";
import { guestData } from "@/store/search-datas";


type Props = {
  isBarOpen: boolean,
  handleBarClose: () => void,
  guestDatas: guestData,
  setGuestData: (key: string, value: number) => void,
}
export const RoomPriceGuestModal:FC<Props> = ({isBarOpen, handleBarClose, guestDatas, setGuestData}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleBarClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return <>
    {
      isBarOpen && <div ref={containerRef} className="relative">
      <div className="absolute z-10 w-full bg-[var(--modal-bg-color)] top-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.6)] rounded-md p-5">
          <GuestHandler guestData={guestDatas} setGuestData={setGuestData}/>
        <div className="flex justify-end">
          <Button onClick={handleBarClose}  className="py-2 font-semibold" variant={VariantsOfButton.transparent}><div className="underline">Close</div></Button>
        </div>
      </div>
    </div>
    }
  </>
};