"use client";
import useLeafletMap  from "@/hook/useLeafLetMap";
import { Timestamp } from "firebase/firestore";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export type Position = [number,number];

export interface Post {
  id: string,
  user_id: string,
  content: string,
  lat: number,
  lng: number,
  timestamp: Timestamp,
  image?: string,
}

// マーカーアイコンのカスタム設定
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [22, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({ posts, userLocation, setPosition, customIcon }: any) => {
  const { mapRef, leafletMapRef } = useLeafletMap(userLocation || [35.681236, 139.767125]);

  // マップクリックハンドラー
  useEffect(() => {
    const map = leafletMapRef.current;
    if (map) {
      map.on("click", (event: L.LeafletMouseEvent) => {
        const newMarker = L.marker(event.latlng, {
          icon: customIcon,
        }).addTo(map);

        setPosition(event.latlng);
      });
    }

    return () => {
      if (map) {
        map.off("click");
      }
    };
  }, [customIcon]);

  // ピンの描画
  useEffect(() => {
    const map = leafletMapRef.current;
    if (map && posts) {
      const markers = posts.map((post: any) => {
        const marker = L.marker([post.latitude, post.longitude]).addTo(map);
        marker.bindPopup(`<b>${post.title}</b><br>${post.description}`);
        return marker;
      });

      return () => {
        markers.forEach((marker:any) => marker.remove());
      };
    }
  }, [posts]);

  // ビュー変更
  useEffect(() => {
    const map = leafletMapRef.current;
    if (map && userLocation) {
      map.setView(userLocation, 13);
    }
  }, [userLocation]);

  return <div ref={mapRef} className="w-full h-[85vh]" />;
};


export default Map;
