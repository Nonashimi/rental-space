"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useCardListStore } from "@/store/cards";
import { useFavoritesStore } from "@/store/favorites";
import CardPopup from "./cart-popup";

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
  const { cardList } = useCardListStore();
  const favorites = useFavoritesStore();

  useEffect(() => {
    import("leaflet").then((leaflet) => setL(leaflet));
  }, []);

  const createCustomIcon = useCallback(
    (price: number, id: number) => {
      if (!L) return null;
      const fav = favorites.inFavList(id);
      return L.divIcon({
        className: "custom-marker",
        html: `<div class="marker-container flex gap-1 hover:scale-105 transition-all duration-300">
                 <span class="marker-text">${price}₽</span>
                 ${fav ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="red">
                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                 </svg>` : ""}
               </div>`,
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

  return (
    <div className="h-full">
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

        {cardList.map((card) => {
          const icon = createCustomIcon(card.price, card.id);
          return (
            icon && (
              <Marker 
                key={card.id} 
                icon={icon} 
                position={[card.coordinates.lat, card.coordinates.lng]}
                >
                <Popup>
                  <CardPopup inFavList={favorites.inFavList} clickToFav={favorites.clickToFav} cardItem={card} />
                </Popup>
              </Marker>
            )
          );
        })}
      </MapContainer>
    </div>
  );
}
