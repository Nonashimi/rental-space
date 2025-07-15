import { create } from 'zustand';
import { Dates, guestData } from './search-datas';
import { CardItem } from './cards';



export enum WhenToPayVariants {
  payNow = 'Pay now',
  payPartNowPartLater = 'Pay part now, part later',
}

export interface TypeState{
  value: {
    WhenToPay: WhenToPayVariants,
    dates: Dates,
    guestData: guestData,
    roomItem: CardItem | null
  },
  actions: {
    setDates: (dates: Dates) => void,
    setGuestData: (guestData: guestData) => void,
    setRoomItem: (roomItem: CardItem) => void,
    handleWhenToPay: (variant: WhenToPayVariants) => void,
  }
}

export const useOrderDatas = create<TypeState>((set, get) => ({
  value: {
    WhenToPay: WhenToPayVariants.payNow,
    dates: {
      checkIn: null,
      checkOut: null,
    },
    guestData: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
    },
    roomItem: null,
  },
  actions: {
    setDates: (dates: Dates) => set((state) => ({
      value: {
        ...state.value,
        dates: dates,
    },
    })),
    setGuestData: (guestData: guestData) => set((state) => ({
      value: {
        ...state.value,
        guestData: guestData,
      },
    })),
    setRoomItem: (roomItem: CardItem) => set((state) => ({
      value: {
        ...state.value,
        roomItem: roomItem,
      },
    })),
    handleWhenToPay: (variant: WhenToPayVariants) => set((state) => ({
      value: {
        ...state.value,
        WhenToPay: variant,
      },
    }))
  }
}));