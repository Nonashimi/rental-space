"use client"
import { SizeOfContainer } from "@/shared/components/container";
import { CardItem } from "@/store/cards";
import { useFavoritesStore } from "@/store/favorites";
import { WishCard } from "@/store/wish-cards";
import { useEffect } from "react";

type Props = {
    setIsFavTitleHide: (value: boolean) => void;
    setSidePadding: (value: number) => void;
    cardList: CardItem[];
    setWishCards: (value: WishCard[]) => void;
}
export const useHandleScroll = ({
    setIsFavTitleHide,
    setSidePadding,
    cardList,
    setWishCards
}: Props) => {
    const {favBlockList} = useFavoritesStore();
    useEffect(() => {
        const widthClass = SizeOfContainer.lg as unknown as string
        const matchResult = widthClass.match(/\d+/)
        const blockWidth = matchResult ? parseInt(matchResult[0], 10) : 0
        const padding = (window.innerWidth - window.innerWidth * blockWidth/100) / 2
        setSidePadding(padding)

        const element = document.querySelector('.observe-fav-title');
        if (!element) return;
      
        let ticking = false;
      
        const handleScroll = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const rect = element.getBoundingClientRect();
              setIsFavTitleHide(rect.top >= 115);
              ticking = false;
            });
            ticking = true;
          }
        };
      
        window.addEventListener('scroll', handleScroll, { passive: true });
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      


      useEffect(() => {
        if (cardList.length === 0 || favBlockList.length === 0) return;
        const prototypeWishCard = favBlockList.map((favBlock => {
          return {id: favBlock.id, card: cardList.filter((card) => favBlock.favoriteItems.includes(card.id)).map((fav) => ({...fav, note: ""}))};
         }))
        setWishCards(prototypeWishCard); 
      }, [cardList]);
}