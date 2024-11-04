"use client";

import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", height: "100vh" }}>

        <div className="d-flex">
          <Typography variant="h3" component="h3">
            Welcome To
          </Typography>
          <Image style={{ marginLeft: 10, width:"auto", height:"100px" }} src="/Title.png" alt="logo" width="300" height="100"/>


        </div>

        <Button
          variant="contained"
          sx={{ marginTop: 5, backgroundColor: "black" }}
          onClick={() => {
            router.push("/home")
          }}>
          今すぐ始める
        </Button>
      </div>
    </>

  );
}
