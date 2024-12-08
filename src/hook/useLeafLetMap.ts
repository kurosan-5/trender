import L from "leaflet";
import { useRef, useEffect } from "react";

const useLeafletMap = (center: [number, number]) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletMapRef = useRef<L.Map | null>(null);

    useEffect(() => {
      if (typeof window !== "undefined" && mapRef.current) {
        // Leafletマップの初期化
        const map = L.map(mapRef.current).setView(center, 13);
        leafletMapRef.current = map;

        // タイルレイヤーを追加
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        return () => {
          map.remove(); // クリーンアップ
        };
      }
    }, [center]);

    return { mapRef, leafletMapRef }; // マップインスタンスを返す
  };


  export default useLeafletMap;