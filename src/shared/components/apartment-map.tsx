"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useCardListStore } from "@/store/cards";
import { useFavoritesStore } from "@/store/favorites";
import CardPopup from "./cart-popup";


export default function ApartmentMap() {
  const [searchValue, setSearchValue] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState<number>(2);
  const [geoData, setGeoData] = useState<any>(null);
  const favorites = useFavoritesStore();

  const createCustomIcon = (price: number, id: number) => {
    const fav = favorites.inFavList(id);
    return L.divIcon({
      className: "custom-marker",
      html: `<div class="marker-container flex gap-1 hover:scale-105 transition-all duration-300 hover:z-10">
               <span class="marker-text">${price}₽</span>
               ${fav ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="red">
                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
               </svg> `: ""}
             </div>`,
      iconSize: [50, 30], 
      iconAnchor: [25, 15], 
    });
    };
  const {cardList} = useCardListStore();

  async function searchLocation(query: string) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await response.json();

      if (data.length === 0) {
        console.warn("Местоположение не найдено.");
        return;
      }

      const { lat, lon, display_name, boundingbox } = data[0];
      const latDiff = Math.abs(parseFloat(boundingbox[0]) - parseFloat(boundingbox[1]));

      const newZoom = latDiff > 20 ? 4 : latDiff > 5 ? 6 : latDiff > 1 ? 8 : 12;
      setZoom(newZoom);
      setMapCenter([parseFloat(lat), parseFloat(lon)]);

      // Запрашиваем GeoJSON с границами
      const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=geojson&q=${query}&polygon_geojson=1`);
      const geoJson = await geoResponse.json();

      if (geoJson?.features?.length > 0) {
        setGeoData(geoJson);
      } else {
        console.warn("GeoJSON не найден.");
        setGeoData(null);
      }

    } catch (error) {
      console.error("Ошибка при поиске местоположения:", error);
    }
  }

  return (
    <div className="h-[100%]">
      {/* <input
        type="text"
        value={searchValue}
        placeholder="Search location..."
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <Button onClick={() => searchLocation(searchValue)} variant={VariantsOfButton.filling}>
        Search
      </Button> */}

      <MapContainer 
        maxZoom = {12} 
        minZoom = {2} 
        className="h-full"  
        center={mapCenter}  
        zoom={zoom} 
        style={{ width: "100%", zIndex: "0"}}
        maxBounds={[
          [-90, -180],  
          [90, 180]  
        ]}
      
        >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeMapCenter center={mapCenter} zoom={zoom} />

        {geoData && (
          <GeoJSON
            key="geojson-layer"
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

        {cardList.map((card) => (
          <Marker icon={createCustomIcon(card.price, card.id)}  key={card.id} position={[card.coordinates.lat, card.coordinates.lng]}>
            <Popup >
             <CardPopup inFavList={favorites.inFavList} clickToFav={favorites.clickToFav}  cardItem={card}/>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function ChangeMapCenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}
