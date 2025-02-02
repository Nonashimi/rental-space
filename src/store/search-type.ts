import { create } from 'zustand';


interface State{
    typeId: number,
    isFocus: boolean,
    setTypeId: (id: number) => void,
    setFocus: (isFocus: boolean) => void
}

export const useTypeStore = create<State>((set) => ({
    typeId: 0,
    isFocus: false,
    setTypeId: (id: number) => set({ typeId: id }),
    setFocus: (isFocus: boolean) => set({ isFocus: isFocus }),
  }));