import { create } from 'zustand';
import { Dates, guestData } from './search-datas';



export enum WhenToPayVariants {
  payNow = 'Pay now',
  payPartNowPartLater = 'Pay part now, part later',
}

export interface TypeState{
  WhenToPay: WhenToPayVariants,
  handleWhenToPay: (variant: WhenToPayVariants) => void,
}

export const useOrderDatas = create<TypeState>((set, get) => ({
  WhenToPay: WhenToPayVariants.payNow,
  handleWhenToPay: (variant: WhenToPayVariants) => set(() => ({WhenToPay: variant})),
}));