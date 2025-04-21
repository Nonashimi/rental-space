"use client"
import { Cluster } from '@/hooks/useClustering';
import { MarkerCondition } from '@/store/cards';
import { useFavoritesStore } from '@/store/favorites';
import React, { useCallback, useEffect, useState } from 'react'
import ListOfCardsPopup from './list-of-cards-popup';
import CardPopup from './cart-popup';
import dynamic from "next/dynamic";

type Props = {
    cluster: Cluster,
    clusters: Cluster[],
    updateCondition: (id: number, condition: MarkerCondition) => void
}

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });




export const CustomMarker = ({cluster, clusters, updateCondition}: Props) =>{
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        import("leaflet").then((leaflet) => setL(leaflet));
      }, []);
    
    const favorites = useFavoritesStore();

    const singleMarker = (condition:MarkerCondition, price:number, id: number) => {
    const fav = favorites.inFavList(id);
        return `<div class="marker-container ${condition} flex gap-1 hover:scale-[106%] transition-all duration-300">
                    <span class="marker-text">${price}₽</span>
                    ${fav ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="${condition === MarkerCondition.ACTIVE?"white":"red"}">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>` : ""}
                </div>`;
    };
    
    
    const clusterMarker = (condition: MarkerCondition) => {
    return  ` <div class="${condition} cluster-marker  flex  hover:scale-[106%] transition-all duration-300">
            </div>`
    ;
    }
    

    const createCustomIcon = useCallback(
    (cluster:Cluster) => {
        if (!L) return null;
        return L.divIcon({
        className: "custom-marker",
        html: cluster.cardItems.length > 1 ? clusterMarker(cluster.condition) : singleMarker(cluster.condition, cluster.cardItems[0].price, cluster.id),
        iconSize: [50, 30],
        iconAnchor: [25, 15],
        });
    },
    [L, favorites]
    );

    const icon = createCustomIcon(cluster);
    
    return (
      icon && (
        <Marker
          key={cluster.cardItems[0].id}
          icon={icon}
          position={[cluster.cardItems[0].coordinates.lat, cluster.cardItems[0].coordinates.lng]}
          eventHandlers={{
            click: () => {
              clusters.map(cl => {
                if (cl.condition === MarkerCondition.ACTIVE) {
                  updateCondition(cl.id, MarkerCondition.VISITED);
                }
                return cl;
              });
              updateCondition(cluster.id, MarkerCondition.ACTIVE);
            },
          }}
        >
          <Popup>
            {cluster.cardItems.length > 1 ? (
              <ListOfCardsPopup cardItems={cluster.cardItems}/>
            ) : (
            <CardPopup inFavList={favorites.inFavList} clickToFav={favorites.clickToFav} cardItem={cluster.cardItems[0]} />
            )}
          </Popup>
        </Marker>
      )
    );
    
}

