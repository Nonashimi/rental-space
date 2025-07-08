"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { CardItem, MarkerCondition } from "@/store/cards";
import { Cluster, useClustering } from "@/hooks/useClustering";
import { useMapEvent } from "react-leaflet";
import { CustomMarker } from "./custom-marker";
import { useZoom } from "@/hooks/useZoom";
import { useDarkMode } from "@/hooks/useDarkMode";
import { cn } from "@/lib/utils";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });


type Props = {
  cardList: CardItem[],
  activeId?: number,
  mapCenter?: [number, number],
  className?: string,
}

export default function ApartmentMap({cardList, activeId, mapCenter = [0, 0], className}: Props) {
  const [geoData, setGeoData] = useState<any>(null);
  const [minDestination, setMinDestination] = useState<number>(10.5);
  const {ClusterMarkers} = useClustering(cardList, minDestination);
  const [clusters, setCLusters] = useState<Cluster[]>(ClusterMarkers());
  const [mapSize, setMapSize] = useState({ width: 800, height: 768 });
  const {zoom} = useZoom(cardList, mapSize);
  const {darkMode} = useDarkMode();

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
    <div className="flex flex-col flex-1 h-full" onClick={(e) => handleMapCLick(e)}>
      <MapContainer
        className={cn("flex-1", className)}
        center={mapCenter}
        zoom={zoom}
        style={{ width: "100%", zIndex: "0", backgroundColor: darkMode ? '#1e1e1e' : '#f2f2f2' }}
        minZoom={2}
        maxZoom={12}
        worldCopyJump={true}
        maxBounds={[[85, -1000], [-85, 1000]]}
        maxBoundsViscosity={1.0}   
      >
        <ZoomWatcher/>
        <TileLayer url={!darkMode?"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png":"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"} />

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
         <CustomMarker activeId = {activeId} key={cluster.id} cluster={cluster} clusters={clusters} updateCondition={updateCondition}/>
        )}
      </MapContainer>
    </div>
  );
}
