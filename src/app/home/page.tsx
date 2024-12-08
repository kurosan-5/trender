"use client";
import React from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useAuthActions } from "@/redux/auth/useActions";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { Container } from "@mui/material";
import dynamic from "next/dynamic";

const Home = () => {
  const Map = dynamic(()=> import('@/components/Map/map'), {ssr:false});
  const { setUser, resetUser } = useAuthActions()
  onAuthStateChanged(auth, async (user) => {
    let isExist = false;
    if (user) {
      setUser({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      });
      //既に登録されたユーザーかどうかを確かめる
      const docRef = await query(collection(db, 'users'), where('id', '==', user.uid));
      const docDatas = await getDocs(docRef);
      docDatas.forEach((docd) => {
        const data = docd.data();
        if (data) {
          isExist = true;
        }

      })
      if (!isExist) {
        //authのuserデータをfirestoreにも移行
        addDoc(collection(db, "users"), {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        })
      }
    } else {
      resetUser();
    }
  });

  return (
    <>
    <Container sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Map />
    </Container>
    </>
  )
}

export default Home;