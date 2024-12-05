'use client'
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Avatar, Box, Button, Typography } from '@mui/material';
import CreatePinComponent from './CreatePinComponent';
import { getDocs, collection, onSnapshot, Timestamp, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { User } from '@/globalType';
import PostViewCard, { getTimeDifference } from '../Cards/PostCard';

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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locChange, setLocChange] = useState(false);
  const [posts, setPosts] = useState<Post[]>([])



  useEffect(() => {

    const fetchPostData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(querySnapshot.docs.map((post) => {
        const data = post.data()
        return {
          id: post.id,
          user_id: data.user_id,
          content: data.content,
          lat: data.lat,
          lng: data.lng,
          timestamp: data.timestamp
        }
      }))
    }

    fetchPostData();
    onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((post) => {
        const data = post.data()
        return {
          id: post.id,
          user_id: data.user_id,
          content: data.content,
          lat: data.lat,
          lng: data.lng,
          timestamp: data.timestamp
        }
      }))
    })
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
  }, [])

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
        {posts && posts.map((post) => (
          <Pin key={post.id} post={post} />
        ))}

        {position && <CreatePinComponent position={position} icon={customIcon} />}

        <ChangeView center={userLocation || [35.681236, 139.767125]} />
      </MapContainer>
      <Button onClick={() => userLocation ? setLocChange(false) : setUserLocation([35.681236, 139.767125])}>
        現在地へ戻る
      </Button>

    </>

  );
};


function Pin({ post }: any) {
  return (
    <Marker
      position={[post.lat, post.lng]}
      icon={customIcon}
    >
      <Popup>
        <PostViewCard post={post}/>
      </Popup>
    </Marker>
  )
}

export default Map;
