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
    updateCondition: (id: number, condition: MarkerCondition) => void,
    activeId?: number,
    RoomMap?: boolean
}

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });




export const CustomMarker = ({cluster, clusters, updateCondition, activeId, RoomMap}: Props) =>{
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        import("leaflet").then((leaflet) => setL(leaflet));
      }, []);
    
    const favorites = useFavoritesStore();
    const activeMarker = (id: number, condition: MarkerCondition) => {
      return activeId != -1 && activeId === id ? MarkerCondition.ACTIVE : condition;
    }

    const singleMarker = (condition:MarkerCondition, price:number, id: number) => {
    const fav = favorites.inFavList(id);
        return `<div class="marker-container ${activeMarker(id, condition)} flex gap-1 hover:scale-[106%] transition-all duration-300">
                    <span class="marker-text">${price}₽</span>
                    ${fav ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="${activeMarker(id, condition) === MarkerCondition.ACTIVE?"white":"red"}">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>` : ""}
                </div>`;
    };

  
    const homeMarker = () => {
      return `<div class="home-marker flex gap-1 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house">
                      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
              </div>`;
    }
    
    
    
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
        html: RoomMap?homeMarker():cluster.cardItems.length > 1 ? clusterMarker(cluster.condition) : singleMarker(cluster.condition, cluster.cardItems[0].price, cluster.id),
        iconSize: [50, 30],
        iconAnchor: [25, 15],
        });
    },
    [L, favorites, activeId]
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
          {!RoomMap &&  <Popup>
            {cluster.cardItems.length > 1 ? (
              <ListOfCardsPopup cardItems={cluster.cardItems}/>
            ) : (
            <CardPopup inFavList={favorites.inFavList} clickToFav={favorites.clickToFav} cardItem={cluster.cardItems[0]} />
            )}
          </Popup>}
        </Marker>
      )
    );
    
}

