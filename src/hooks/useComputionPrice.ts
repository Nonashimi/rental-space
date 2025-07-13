'use client';
import { Dates } from "@/store/search-datas";
import { useMemo } from "react";


type Props = {
  dates: Dates
}

export const useComputionDay = ({dates}: Props) => {

  const fullCount = useMemo(() => {
    const msPerDay = 1000 * 60 * 60 * 24;
    if(!dates.checkIn || !dates.checkOut) return 0;
    const utc1 = Date.UTC(dates.checkIn!.getFullYear(), dates.checkIn!.getMonth(), dates.checkIn!.getDate());
    const utc2 = Date.UTC(dates.checkOut!.getFullYear(), dates.checkOut!.getMonth(), dates.checkOut!.getDate());

    const diffInMs = Math.abs(utc2 - utc1);
    return Math.floor(diffInMs / msPerDay);

  },[ dates.checkIn, dates.checkOut]);


  return {
    fullCount
  }
}