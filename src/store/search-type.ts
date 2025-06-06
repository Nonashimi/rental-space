import { create } from 'zustand';


export interface TypeState{
    typeId: number,
    isFocus: boolean,
    setTypeId: (id: number) => void,
    setFocus: (isFocus: boolean) => void
}

export const useTypeStore = create<TypeState>((set) => ({
    typeId: 0,
    isFocus: false,
    setTypeId: (id: number) => set({ typeId: id }),
    setFocus: (isFocus: boolean) => set({ isFocus: isFocus }),
  }));