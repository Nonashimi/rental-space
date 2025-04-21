"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { MarkerCondition, useCardListStore } from "@/store/cards";
import { Cluster, useClustering } from "@/hooks/useClustering";
import { useMapEvent } from "react-leaflet";
import { CustomMarker } from "./custom-marker";

// Динамический импорт react-leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });


export default function ApartmentMap() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState<number>(2);
  const [geoData, setGeoData] = useState<any>(null);
  const { cardList } = useCardListStore();  // Предполагается, что в store есть метод updateCardCondition
  const [minDestination, setMinDestination] = useState<number>(10.5);
  const {ClusterMarkers} = useClustering(cardList, minDestination);
  const [clusters, setCLusters] = useState<Cluster[]>(ClusterMarkers());
 


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



  // const searchLocation = useCallback(async (query: string) => {
  //   try {
  //     const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
  //     const data = await response.json();

  //     if (data.length === 0) {
  //       console.warn("Местоположение не найдено.");
  //       return;
  //     }

  //     const { lat, lon, boundingbox } = data[0];
  //     const latDiff = Math.abs(parseFloat(boundingbox[0]) - parseFloat(boundingbox[1]));
  //     const newZoom = latDiff > 20 ? 4 : latDiff > 5 ? 6 : latDiff > 1 ? 8 : 12;

  //     setZoom(newZoom);
  //     setMapCenter([parseFloat(lat), parseFloat(lon)]);

  //     const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=geojson&q=${query}&polygon_geojson=1`);
  //     const geoJson = await geoResponse.json();

  //     setGeoData(geoJson?.features?.length > 0 ? geoJson : null);
  //   } catch (error) {
  //     console.error("Ошибка при поиске местоположения:", error);
  //   }
  // }, []);


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

        {clusters.map((cluster) => 
         <CustomMarker key={cluster.id} cluster={cluster} clusters={clusters} updateCondition={updateCondition}/>
        )}
      </MapContainer>
    </div>
  );
}
