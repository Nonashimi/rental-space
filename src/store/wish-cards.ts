import { create } from 'zustand';
import { CardItem } from './cards';


interface wishCard extends CardItem{
    note: string
}

interface State{
    wishCards: wishCard[],
    setChangeNote: (id: number, note: string) => void,
    setWishCards: (wishCards: wishCard[]) => void,
}

export const useWishCardsStore = create<State>((set, get) => ({
    wishCards: [],
    setChangeNote: (id: number, note: string) => set((state) => {
        const wishCards = state.wishCards.map((card) => {
            if(card.id === id){
                return {...card, note: note}
            }
            return card
        })
        return {wishCards}
    }),
    setWishCards: (wishCards: wishCard[]) => {
        const updateWishCards = wishCards.map((card) => {
            return {...card, note: get().wishCards.find((c) => c.id === card.id)?.note || ""}
        });
        set({ wishCards: updateWishCards });
    }
  }));