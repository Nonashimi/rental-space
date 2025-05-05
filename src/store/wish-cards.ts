import { create } from 'zustand';
import { CardItem } from './cards';

export interface CardNote extends CardItem {
  note: string;
}

export interface WishCard {
  id: number;
  card: CardNote[];
}

interface State {
  wishCards: WishCard[];
  setChangeNote: (wishId: number, cardId: number, note: string) => void;
  setWishCards: (wishCards: WishCard[]) => void;
}

export const useWishCardsStore = create<State>((set, get) => ({
  wishCards: [],
  
  setChangeNote: (wishId, cardId, note) => {
    set((state) => {
      const updatedWishCards = state.wishCards.map((wishCard) => {
        if (wishCard.id == wishId) {
          const updatedCards = wishCard.card.map((card) => {
            if (card.id == cardId) {
              return { ...card, note };
            }
            return card;
          });
          return { ...wishCard, card: updatedCards };
        }
        return wishCard;
      });
      return { wishCards: updatedWishCards };
    });
  },

  setWishCards: (newWishCards) => {
    const currentCards = get().wishCards;

    const updatedWishCards = newWishCards.map((newWish) => {
      const existingWish = currentCards.find((w) => w.id === newWish.id);

      const updatedCards = newWish.card.map((newCard) => {
        const existingCard = existingWish?.card.find((c) => c.id === newCard.id);
        return {
          ...newCard,
          note: existingCard?.note ?? newCard.note,
        };
      });

      return {
        ...newWish,
        card: updatedCards,
      };
    });

    set({ wishCards: updatedWishCards });
  },
}));
