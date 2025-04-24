import { create } from 'zustand';


interface State{
    isItList: boolean, 
    switchToList: () => void,
    switchToMap: () => void,
    handleSwitch: () => void,
}

export const useViewType = create<State>((set, get) => ({
    isItList: true,
    switchToList: () => set({isItList: true}),
    switchToMap: () => set({isItList: false}),
    handleSwitch: () => set({isItList: !get().isItList}),
  }));