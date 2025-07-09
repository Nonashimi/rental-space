'use client';
import { Dates, guestData } from "@/store/search-datas";
import { useState } from "react"



export const useRoomInformation = () => {
  const [guestDatas, setGuestData] = useState<guestData>({
          adults: 1,
          children: 0,
          infants: 0,
          pets: 0,
        });
  const [dates, setDates] = useState<Dates>({});

  const handleGuestDatas = (key: string, value: number) => {
    setGuestData((prev) => {
      return {...prev, [key]: value};
    });
  };

  return {
    guestDatas,
    handleGuestDatas,
    dates,
    setDates
  }
}