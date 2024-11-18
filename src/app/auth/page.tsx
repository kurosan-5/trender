'use client'
import PopupGoogleSigninButton from "@/components/Buttons/PopupGoogleSigninButton";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const AuthSelect = () => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ height: '100vh', gap: 2 }}
            >
                <Typography variant="h3"sx={{marginBottom:5, padding:5, textAlign:"center"}} component="h3">TRENDERを始めよう</Typography>

                <PopupGoogleSigninButton />
                <Link href="/auth/signin">
                    <Button variant="contained">
                        メールアドレスでサインイン
                    </Button>
                </Link>
                <Link href="/auth/signup">
                    <Button variant="contained">
                        メールアドレスで新規登録
                    </Button>
                </Link>
            </Box>
        </>
    )
}
export default AuthSelect;