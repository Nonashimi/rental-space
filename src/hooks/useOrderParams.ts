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
    console.log(params);
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

  const handleDates = (newDates: Dates) => {
    setDates(newDates);
    console.log('Updated dates:', newDates);
    setParams({
      checkIn: newDates.checkIn ? newDates.checkIn.toLocaleDateString('en-CA') : '',
      checkOut: newDates.checkOut ? newDates.checkOut.toLocaleDateString('en-CA') : '',
    });
  };

  const updateOrderParams = (data: { guests?: guestData; dates?: Dates }) => {
    const params: Record<string, any> = {};

    if (data.guests) {
      setGuestData(data.guests);
      (Object.keys(data.guests) as (keyof guestData)[]).forEach(k => {
        if (data.guests![k] > 0) {
          params[k] = data.guests![k];
        }
      });
    }

    if (data.dates) {
      setDates(data.dates);
      if (data.dates.checkIn) {
        params.checkIn = data.dates.checkIn.toLocaleDateString('en-CA');
      }
      if (data.dates.checkOut) {
        params.checkOut = data.dates.checkOut.toLocaleDateString('en-CA');
      }
    }

    setParams(params);
  };



  return {
    handleDates,
    handleGuestDatas,
    updateOrderParams
  }
};