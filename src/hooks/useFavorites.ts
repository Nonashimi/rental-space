"use client"

import { useState } from "react";



export const useFavorites = () => {
        const [favoriteItems, setFavoriteItems] = useState(new Set<number>());
    
        const handleFav = (id: number) => {
            setFavoriteItems((prev) => {
              const newSet = new Set(prev);
              if (newSet.has(id)) {
                newSet.delete(id);
              } else {
                newSet.add(id);
              }
              return newSet;
            });
          };



          return {
            favoriteItems,
            setFavoriteItems,
            handleFav
          }
}