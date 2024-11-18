'use client'
import SignOutButton from "@/components/Buttons/SignOutButton"
import Link from "next/link"
import { useState } from "react";
import { auth } from "../../../firebase";
import { Button, Box, Grid2 } from "@mui/material";
import { useAuthActions } from "@/redux/auth/useActions";
import { User } from "firebase/auth";
import { useSelector } from "react-redux";
export default function Header() {

    const user = useSelector((state: { auth:{ user: User|null }}) => {
        console.log(state.auth.user)
        return state.auth.user
    })

    const AuthButtons = !user?.uid ? (
        <Grid2
            display="flex"
            flexDirection="row"
            sx={{ marginLeft: "auto", height: '100vh', gap: 2, marginRight: 3, marginTop: 1 }}
        >
            <Link href="/auth/signup">
                <Button variant="outlined" color="success" sx={{ width: 150 }}>
                    新規登録
                </Button>
            </Link>
            <Link href="/auth/signin">
                <Button variant="outlined" color="success" sx={{ width: 150 }}>
                    ログイン
                </Button>
            </Link>
        </Grid2>
    ) : (
        <SignOutButton />
    );

    return (
        <nav className="p-0 navbar navbar-expand-lg header shadow bg-white" style={{ height: 50 }}>
            <Grid2
                container
                display="flex"
                flexDirection="row"
                sx={{ height: 50, width: "100vw", gap: 2 }}
            >
                <Link href="/home" style={{ minWidth: 200 }}><img style={{ marginLeft: 5 }} src="/Title.png" alt="TRENDER" width="200" height="28" />
                </Link>
                {AuthButtons}
            </Grid2>
        </nav>
    )
}