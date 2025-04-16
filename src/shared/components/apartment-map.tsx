"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { CardItem, MarkerCondition, useCardListStore } from "@/store/cards";
import { useFavoritesStore } from "@/store/favorites";
import CardPopup from "./cart-popup";
import { Cluster, useClustering } from "@/hooks/useClustering";
import ListOfCardsPopup from "./list-of-cards-popup";
import { useMapEvent } from "react-leaflet";

// Динамический импорт react-leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });


export default function ApartmentMap() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState<number>(2);
  const [geoData, setGeoData] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const { cardList } = useCardListStore();  // Предполагается, что в store есть метод updateCardCondition
  const favorites = useFavoritesStore();
  const [minDestination, setMinDestination] = useState<number>(10.5);
  const {ClusterMarkers} = useClustering(cardList, minDestination);
  const [clusters, setCLusters] = useState<Cluster[]>(ClusterMarkers());
  useEffect(() => {
    import("leaflet").then((leaflet) => setL(leaflet));
  }, []);

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



  const updateCondition = (id: number, condition: MarkerCondition) => {
    setCLusters((prevClusters) => {
      const updatedClusters = prevClusters.map((cluster) => {
        if (cluster.id === id) {
          return { ...cluster, condition };
        }
        return cluster;
      });

      return updatedClusters;
    }
    );
  }



  function ZoomWatcher() {
    useMapEvent('zoomend', (e) => {
      const zoom = e.target.getZoom();
      if(zoom >= 3 && zoom <= 4){
        setMinDestination(3);
      }else if(zoom > 4 && zoom <= 10){
        setMinDestination(0);
      }else{
        setMinDestination(10.5);
      }
     
   
    });

    return null;
  }


  useEffect(() => {
    const updatedClusters = ClusterMarkers();
    const popup = document.querySelectorAll(".leaflet-popup");
    for(let i = 0; i < popup.length; i++) {
      popup[i].remove();
    }
    setCLusters(
      updatedClusters.map((cluster) => {
        return { ...cluster, condition: clusters.find((c) => c.id === cluster.id)?.condition === MarkerCondition.ACTIVE ? MarkerCondition.VISITED : clusters.find((c) => c.id === cluster.id)?.condition || MarkerCondition.DEFAULT };
      })
    );
  }, [minDestination]);


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

  const searchLocation = useCallback(async (query: string) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await response.json();

      if (data.length === 0) {
        console.warn("Местоположение не найдено.");
        return;
      }

      const { lat, lon, boundingbox } = data[0];
      const latDiff = Math.abs(parseFloat(boundingbox[0]) - parseFloat(boundingbox[1]));
      const newZoom = latDiff > 20 ? 4 : latDiff > 5 ? 6 : latDiff > 1 ? 8 : 12;

      setZoom(newZoom);
      setMapCenter([parseFloat(lat), parseFloat(lon)]);

      const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=geojson&q=${query}&polygon_geojson=1`);
      const geoJson = await geoResponse.json();

      setGeoData(geoJson?.features?.length > 0 ? geoJson : null);
    } catch (error) {
      console.error("Ошибка при поиске местоположения:", error);
    }
  }, []);


  const handleMapCLick = (e:React.MouseEvent<HTMLDivElement>) => {
    clusters.map(card => {
      if(card.condition === MarkerCondition.ACTIVE) {
        updateCondition(card.id, MarkerCondition.VISITED);
      }
    });
  };

  return (
    <div className="h-full" onClick={(e) => handleMapCLick(e)}>
      <MapContainer
        className="h-full"
        center={mapCenter}
        zoom={zoom}
        style={{ width: "100%", zIndex: "0" }}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        minZoom={2}
        maxZoom={12}
        
      >
        <ZoomWatcher/>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {geoData && (
          <GeoJSON
            data={geoData}
            style={() => ({
              color: "#ff0000",
              weight: 2,
              fillColor: "#ff0000",
              fillOpacity: 0.2,
            })}
            onEachFeature={(feature, layer) => {
              if (feature.properties?.display_name) {
                layer.bindPopup(feature.properties.display_name);
              }
            }}
          />
        )}

        {clusters.map((cluster) => {
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
        })}
      </MapContainer>
    </div>
  );
}
