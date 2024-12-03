'use client'
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Avatar, Box, Button, Typography } from '@mui/material';
import CustomPopper from '@/components/CustomPopper';

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
  const [positions, setPositions] = useState([[35.68170116720479, 139.79518890380862], [35.71961857038755, 139.81973648071292]])

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
    if (userLocation && !locChange) {
      const map = useMap();
      map.flyTo(center, map.getZoom())
      setLocChange(true);

      return null;
    }
  };


  //ピンを刺す    
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
        center={userLocation || [35.681236, 139.767125]} // ユーザーの現在地が取得できるまでデフォルト位置を使用
        zoom={13}
        style={{ height: '85vh', width: '100%', position: 'relative' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {positions && positions.map((position) => (
          <Pin key={position} position={position} />
        ))
        }

        <ChangeView center={userLocation || [35.681236, 139.767125]} />
      </MapContainer>
      <Button onClick={() => userLocation ? setLocChange(false) : setUserLocation([35.681236, 139.767125])}>
        現在地へ戻る
      </Button>

    </>

  );
};

function Pin({ position }: any) {
  return (
    <Marker
      position={position}
      icon={customIcon}
    >
      <Popup>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar alt="Ann" sx={{ width: 32, height: 32 }} />
          <Typography variant="body2" fontWeight="bold">
            Ann 2024/12/03
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          I really love this place because the scenery here is absolutely beautiful. The views are
          stunning, and I feel a deep connection to the surroundings.
        </Typography>
      </Popup>
    </Marker>
  )
}

export default Map;
