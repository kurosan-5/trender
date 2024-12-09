"use client";
import useLeafletMap from "@/hook/useLeafLetMap";
import { collection, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import styled from "@emotion/styled";  
import { createRoot } from "react-dom/client";
import CreatePinComponent from "./CreatePinComponent";
import { AlertProvider } from "@/context/AlertContext";
import StoreProvider from "@/redux/StoreProvider";
import ReactDOM from 'react-dom/client';


export type Position = { lat: number, lng: number };

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

//カスタムポップアップ
const StyledPopup = styled.div`
  .leaflet-popup-content {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #fff;
  }

  .leaflet-popup-content-wrapper {
    background-color: yellow;
    padding: 8px;
    border-radius: 8px;
  }

  .leaflet-popup-tip {
    background-color: yellow;
  }
`;

const Pop = ({ post }: any) => (
  <div>
    <h4>{post.title}</h4>
    <p>{post.description}</p>
  </div>
);



const Map = () => {

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locChange, setLocChange] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  let marker: L.Marker | null = null;
  const [post, setPost] = useState({ title: "ピンのタイトル", description: "ここに詳細情報を記載します。" }); // ポップアップのデータ
  let root : ReactDOM.Root |null = null;




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

    // 地図の初期化
    var map = L.map('map').setView([35.6895, 139.6917], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // クリックイベントを追加
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;

      if (marker && root) {
        map.removeLayer(marker);
        if (root) {
          root.unmount();
          root = null;  // rootをnullにリセット
        }
      }



      // 新しいマーカーを追加
      marker = L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(
          '<div id="popup-container"></div>'
          , { autoClose: false }
        )
        .openPopup();

        const container = document.getElementById("popup-container");
        if (container) {
          if (root) {
            root.unmount();
          }
          root = createRoot(container);
          root.render(
            <StoreProvider>
              <AlertProvider>
                <CreatePinComponent position={e.latlng} icon={customIcon} map={map} />
              </AlertProvider>
            </StoreProvider>

          );
        }
    });

    // クリーンアップ処理
    return () => {
      map.remove(); // 地図を削除

      if (root) {
        root.unmount();
        root = null;
      }
    };
  }, [])

  return <div id="map" className="w-full h-[85vh]" />;
};


export default Map;
