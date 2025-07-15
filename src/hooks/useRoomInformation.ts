'use client';
import { Dates, guestData } from "@/store/search-datas";
import { useState, useEffect } from "react";
import { useQueryParams } from "./useQueryParams";

export const useRoomInformation = () => {
  const { getParams, setParams } = useQueryParams();

  const [guestDatas, setGuestData] = useState<guestData>({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [dates, setDates] = useState<Dates>({});

  // Инициализация из URL
  useEffect(() => {
    const params = getParams();

    setGuestData({
      adults: Number(params.adults) || 1,
      children: Number(params.children) || 0,
      infants: Number(params.infants) || 0,
      pets: Number(params.pets) || 0,
    });

    if (params.checkIn || params.checkOut) {
      setDates({
        checkIn: params.checkIn ? new Date(params.checkIn) : undefined,
        checkOut: params.checkOut ? new Date(params.checkOut) : undefined,
      });
    }
  }, []);
  const handleGuestDatas = (guestData: guestData) => {
   
    const params: Record<string, any> = {};
    console.log('Updated guest data:', guestData);
    (Object.keys(guestData) as (keyof guestData)[]).forEach(k => {
      if (guestData[k] > 0) {
        params[k] = guestData[k];
      }
    });

    setParams(params);
  };

  // Обновление дат
  const handleDates = (newDates: Dates) => {
    setDates(newDates);

    setParams({
      checkIn: newDates.checkIn ? newDates.checkIn.toLocaleDateString('en-CA') : '',
      checkOut: newDates.checkOut ? newDates.checkOut.toLocaleDateString('en-CA') : '',
    });
  };

  return {
    guestDatas,
    handleGuestDatas,
    dates,
    handleDates,
  };
};
