'use client'
import { useState } from 'react';
import { auth } from '../../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "next/navigation";

import { Button, TextField, Typography, Box } from '@mui/material';

interface Error {
    email?:string
    password?:string
    other?:string
}


const SignIn = () => {

    const router = useRouter();
    const [emailText, onChangeEmailText] = useState('');
    const [passwordText, onChangePasswordText] = useState('');

    const [error, setError] = useState<Error>()

    const pressLoginButton = () => {
        signInWithEmailAndPassword(auth, emailText, passwordText)
            .then(() => {
                router.push('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-email') {
                    setError({ "email": 'メールアドレスの形式が違います' });
                } else if (errorCode === 'auth/invalid-credential') {
                    setError({ "password": 'パスワードが間違っています' });
                } else if (errorCode === "auth/missing-password") {
                    setError({ "password": 'パスワードを入力してください' });
                } else {
                    setError({ "other": 'エラーが発生しました。再度お試しください' });
                }
            })
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100vh', bgcolor: '#f9f9f9' }}
        >
            <Typography variant="h4">
                Trenderにサインイン
            </Typography>

            {error?.other && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error.other}
                </Typography>
            )}

            <TextField
                label="Email"
                variant="outlined"
                value={emailText}
                onChange={(e) => onChangeEmailText(e.target.value)}
                placeholder="Input email"
                sx={{ mb: 2, width: 250, mt:1 }}
                helperText={error?.email}
                error={error?.email != undefined}
            />

            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={passwordText}
                onChange={(e) => onChangePasswordText(e.target.value)}
                placeholder="Input password"
                sx={{ mb: 2, width: 250 }}
                helperText={error?.password}
                error={error?.password != undefined}
            />


            <Button
                variant="contained"
                color="primary"
                onClick={pressLoginButton}
                sx={{ mb: 2, width: 200 }}
            >
                SignIn
            </Button>

            <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                    onChangeEmailText('kurowassan55555@gmail.com');
                    onChangePasswordText('secret');
                }}
                sx={{ mb: 2, width: 200 }}
            >
                Default SignIn (me)
            </Button>

            <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                    onChangeEmailText('job@job.job');
                    onChangePasswordText('secret');
                }}
                sx={{ mb: 2, width: 200 }}
            >
                Default SignIn (job)
            </Button>

            <Button
                variant="text"
                onClick={() => router.push('/resetPassword')}
                sx={{ mb: 1 }}
            >
                Reset Password
            </Button>

            <Button
                variant="text"
                onClick={() => router.push('/home')}
                sx={{ mb: 1 }}
            >
                Go to Home
            </Button>
        </Box>
    );
}

export default SignIn;