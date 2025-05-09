"use client"
import { CardItem } from "@/store/cards";
import { useMemo } from "react";

export const useZoom = (cardList: CardItem[], mapSize: {height: number, width: number}) => {

      const zoom = useMemo(() => {
        if (cardList.length === 0) return 2;
      
        let max_lat = -Infinity, min_lat = Infinity;
        let max_lng = -Infinity, min_lng = Infinity;
      
        cardList.forEach((card) => {
          const lat = card.coordinates.lat;
          const lng = card.coordinates.lng;
          if (lat > max_lat) max_lat = lat;
          if (lat < min_lat) min_lat = lat;
          if (lng > max_lng) max_lng = lng;
          if (lng < min_lng) min_lng = lng;
        });
      
        const WORLD_DIM = { height: 256, width: 256 };
        const ZOOM_MAX = 12;
        const PADDING_RATIO = 1.1; 
      
        function latRad(lat: number) {
          const sin = Math.sin(lat * Math.PI / 180);
          const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
          return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
        }
      
        function zoom(mapPx: number, worldPx: number, fraction: number) {
          return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
        }
      
        const latFraction = ((latRad(max_lat) - latRad(min_lat)) / Math.PI) * PADDING_RATIO;
        const lngFraction = ((max_lng - min_lng) / 360) * PADDING_RATIO;
      
        const latZoom = zoom(mapSize.height, WORLD_DIM.height, latFraction);
        const lngZoom = zoom(mapSize.width, WORLD_DIM.width, lngFraction);
      
        return Math.max(Math.min(latZoom, lngZoom, ZOOM_MAX), 2);
      }, [cardList, mapSize]);


      return {zoom};
      
}