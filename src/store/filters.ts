import { Variant } from '@/shared/components/filter-btns';
import { count } from 'console';
import { create } from 'zustand';


export interface Category{
    id: number,
    title: string,
    image: string
}
export interface rooms{
    id: number,
    title: string,
    count: number,
}

export enum PlusOrMinus{
    plus = "+",
    minus = "-"
}

export const maxValues = 8;
interface State{
    category: number,
    typeOfFilter: Variant,
    prices: {min: number, max: number},
    rooms: rooms[],
    amenities: number[],
    possibility: number[],
    isDemanded: boolean,
    setCategroies: (category: number) => void,
    setTypeOfFilter: (typeOfFilter: Variant) => void,
    setPrices: (prices: {min: number, max: number}) => void,
    setRooms: (id: number, PlusOrMinus: PlusOrMinus) => void,
    setArrayRoom: (rooms: rooms[])  => void
    setAmenities: (amenities: number) => void,
    setArrayAmenities: (amenities: number[]) => void
    setPossibility: (possibility: number) => void,
    setArrayPossibility: (possibility: number[]) => void
    setIsDemanded: (isGood: boolean) => void,
    cleanAll: () => void
}

export const useFilterStore = create<State>((set) => ({
    category: 1,
    typeOfFilter: Variant.all,
    prices: {min: 5000, max: 100000},
    rooms: [
        {id: 1, title: "Спальни", count: 0},
        {id: 2, title: "Кровати", count: 0},
        {id: 3, title: "Ванные", count: 0},
    ],
    amenities: [],
    possibility: [],
    isDemanded: false,
    setCategroies: (category: number) => set({category: category}),
    setTypeOfFilter: (typeOfFilter: Variant) => set({typeOfFilter: typeOfFilter}),
    setPrices: (prices: {min: number, max: number}) => set({prices: prices}),
    setRooms: (id: number, value: PlusOrMinus) => {
        if(value === PlusOrMinus.plus){
            set((state) => ({
                rooms: state.rooms.map((room) => room.id === id 
                ? {...room, count: Number(room.count + 1)}
                : room)
            }));
        }else{
            set((state) => ({
                rooms: state.rooms.map((room) => room.id === id 
                ? {...room, count: Number(room.count - 1)}
                : room)
            }));
        }
       
    },
    setArrayRoom: (rooms: rooms[]) => set({rooms: rooms}),
    setAmenities: (amenity: number) => {
        set((state) => ({
            amenities: state.amenities.includes(amenity)
                ? state.amenities.filter(a => a !== amenity) 
                : [...state.amenities, amenity] 
        }));
    },
    setArrayAmenities: (amenities: number[]) => set({amenities: amenities}),
    setPossibility: (possibility: number) =>{
        set((state) => ({
            possibility: state.possibility.includes(possibility)?
                state.possibility.filter(p => p !== possibility)
                : [...state.possibility, possibility]
        }))
    },
    setArrayPossibility: (possibility: number[]) => set({possibility: possibility}),
    setIsDemanded: (isDemanded: boolean) => set({isDemanded: isDemanded}),
    cleanAll: () => set({
        typeOfFilter: Variant.all,
        prices: {min: 5000, max: 100000},
        rooms: [
            {id: 1, title: "Спальни", count: 0},
            {id: 2, title: "Кровати", count: 0},
            {id: 3, title: "Ванные", count: 0},
        ],
        amenities: [],
        possibility: [],
        isDemanded: false
    })
  }));