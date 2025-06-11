import { create } from 'zustand';


export type Dates = {
  checkIn?: Date | null;
  checkOut?: Date | null;
}

export enum TypeOfDate  {
  checkIn = "CHECKIN",
  checkOut = "CHECKOUT"
}

export type month = {
  id: string,
  month: string,
  year: number,
}


export type guestData = {
  adults: number,
  children: number,
  infants: number,
  pets: number
}


interface State{
    destination: string;
    dateType: number;
    dataFromDate: Dates;
    dataFromMonths: Dates,
    activeMonth: number,
    activeDate: TypeOfDate,
    duration: number,
    months: month[],
    guestData: guestData,
    setActiveMonth: (value: number) => void,
    setDataFromMonths: (data: Dates) => void,
    setDataFromDate: (data: Dates) => void;
    setDestination: (destination: string) => void;
    setDateType: (dateType: number) => void;
    setActiveDate: (value: TypeOfDate) => void,
    setDuration :(val: number) => void,
    setMonths: (val: month) => void,
    clearMonths: () => void,
    setGuestData: (key: string, value: number) => void,
    clearGuestData: () => void,
}

export const useSearchDatasStore = create<State>((set, get) => ({
    destination: '',
    dateType: 1,
    dataFromDate: {
      checkIn: null,
      checkOut: null,
    },
    dataFromMonths:{
      checkIn: null,
      checkOut: null
    },
    activeMonth:3,
    duration: 1,
    months: [],
    activeDate: TypeOfDate.checkIn,
    guestData: {adults: 0, children: 0, infants: 0, pets: 0},
    setActiveMonth: (value) => set({activeMonth: value}),
    setDataFromDate: (data) => set({ dataFromDate: { ...data } }),
    setDestination: (destination) => set({ destination }),
    setDateType: (dateType) => set({ dateType }),
    setDataFromMonths: (data) => set({dataFromMonths: { ...data}}),
    setActiveDate: (value) => set({activeDate: value}),
    setDuration: (val) => set({duration: val}),
    setMonths: (val) => {
      if(get().months.includes(val)){
        set({months: get().months.filter(month => month.id != val.id)});
      }else{
        set({months: [...get().months, val]});
      }
    },
    clearMonths: () => {
      set({months: []});
    },
    setGuestData: (key, value) => {
      set({guestData: {...get().guestData, [key]: value}});
    },
    clearGuestData: () => {
      set({guestData: {adults: 0, infants: 0, children: 0, pets: 0}});
    }
  }));