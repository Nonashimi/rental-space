'use client'
import { useOrderDatas } from "@/store/order-datas";
import { useQueryParams } from "./useQueryParams";
import { useEffect } from "react";
import { Dates, guestData } from "@/store/search-datas";


export const useOrderParams = () => {
  const { getParams, setParams } = useQueryParams();
  const {value, actions} = useOrderDatas();
  const { setDates, setGuestData } = actions;
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
    setGuestData(guestData);
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
    handleDates,
    handleGuestDatas
  }
};