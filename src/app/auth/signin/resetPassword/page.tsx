"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { auth } from "../../../../../firebase";

const ResetPassword: React.FC = () => {
    const [emailText, setEmailText] = useState<string>("");
    const router = useRouter();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100vh", padding: 2 }}
        >
            <Typography variant="h6" align="center" sx={{ marginBottom: 2, width: "60%" }}>
                メールアドレスを入力して{"\n"}パスワードをリセット
            </Typography>

            <TextField
                fullWidth
                label="メールアドレスを入力"
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                sx={{ marginBottom: 2, width:300 }}
            />

            <ResetPasswordButton email={emailText} />

            <Button
                variant="text"
                onClick={() => router.push("/home")}
                sx={{marginTop:2}}
            >
                トップページに戻る
            </Button>
        </Box>
    );
};


const ResetPasswordButton = ({ email } : {email:string}) => {
    const sendResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage)
            })
    }

    return (
        <Button variant="contained" onClick={sendResetPassword}>パスワードを再設定</Button>
    )
}

export default ResetPassword;