import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@mui/material';

// マーカーアイコンのカスタム設定
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locChange, setLocChange] = useState(false);

  useEffect(() => {
    // 現在地を取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('現在地の取得に失敗しました', error);
      }
    );
  }, []);

  // 中心を動的に変更するコンポーネント
  const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
    if(userLocation && !locChange){
        const map = useMap();
        map.setView(center, map.getZoom()); // 現在のズームレベルを維持して中心を変更
        setLocChange(true);
        return null;
    }
  };



  // カスタムイベントハンドラ
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <>
    <MapContainer
      center={userLocation || [51.505, -0.09]} // ユーザーの現在地が取得できるまでデフォルト位置を使用
      zoom={13}
      style={{ height: '85vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      {position && <Marker position={position} icon={customIcon} />}
      <ChangeView center={userLocation || [51.505, -0.09]} />
    </MapContainer>
    <Button onClick={()=>setLocChange(false)}>現在地へ戻る</Button>

    </>

  );
};

export default Map;
