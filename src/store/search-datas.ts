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


interface State{
    destination: string;
    dateType: number;
    dataFromDate: Dates;
    dataFromMonths: Dates,
    activeMonth: number,
    activeDate: TypeOfDate,
    duration: number,
    months: month[],
    setActiveMonth: (value: number) => void,
    setDataFromMonths: (data: Dates) => void,
    setDataFromDate: (data: Dates) => void;
    setDestination: (destination: string) => void;
    setDateType: (dateType: number) => void;
    setActiveDate: (value: TypeOfDate) => void,
    setDuration :(val: number) => void,
    setMonths: (val: month) => void,
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
    setActiveMonth: (value: number) => set({activeMonth: value}),
    setDataFromDate: (data: Dates) => set({ dataFromDate: { ...data } }),
    setDestination: (destination: string) => set({ destination }),
    setDateType: (dateType: number) => set({ dateType }),
    setDataFromMonths: (data: Dates) => set({dataFromMonths: { ...data}}),
    setActiveDate: (value: TypeOfDate) => set({activeDate: value}),
    setDuration: (val: number) => set({duration: val}),
    setMonths: (val: month) => {
      if(get().months.includes(val)){
        set({months: get().months.filter(month => month.id != val.id)});
      }else{
        set({months: [...get().months, val]});
      }
    }
  }));