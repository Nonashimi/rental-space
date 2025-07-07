import { create } from 'zustand';
import { Dates, guestData } from './search-datas';


export interface TypeState{
  guestDatas: guestData,
  dates: Dates,
  setDates:(data: Dates) => void,
  setGuestData: (key: string, value: number) => void,
}

export const useOrderDatas = create<TypeState>((set, get) => ({
  guestDatas: {
          adults: 1,
          children: 0,
          infants: 0,
          pets: 0,
        },
  dates: {},
  setDates:(data) => set({ dates: { ...data } }),
  setGuestData: (key, value) => {
      set({guestDatas: {...get().guestDatas, [key]: value}});
    }
}));