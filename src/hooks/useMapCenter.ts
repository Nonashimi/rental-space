"use client"
import { CardItem } from "@/store/cards";
import { useFavoritesStore } from "@/store/favorites";
import { useMemo } from "react";

type Props = {
    cardList: CardItem[];
    id: number;
}

export const useMapCenter = ({cardList, id}: Props) => {
        const favBlockList = useFavoritesStore().favBlockList;
          const mapCenter = useMemo(() => {
            const block = favBlockList.find((block) => block.id == id);
            if (!block) return [0, 0] as [number, number];
          
            const favs = cardList.filter((card) => block.favoriteItems.includes(card.id));
            const validCards = favs.filter(card =>
              typeof card.coordinates.lat === 'number' &&
              typeof card.coordinates.lng === 'number'
            );
          
            if (validCards.length === 0) return [0, 0];
            if (validCards.length === 1) return [validCards[0].coordinates.lat, validCards[0].coordinates.lng];
          
            let max_lat = -Infinity, min_lat = Infinity;
            let max_lng = -Infinity, min_lng = Infinity;
          
            validCards.forEach(({ coordinates: { lat, lng } }) => {
              if (lat > max_lat) max_lat = lat;
              if (lat < min_lat) min_lat = lat;
              if (lng > max_lng) max_lng = lng;
              if (lng < min_lng) min_lng = lng;
            });
          
            return [(max_lat + min_lat) / 2, (max_lng + min_lng) / 2] as [number, number];
          }, [cardList, favBlockList, id]);

          return { mapCenter };
}