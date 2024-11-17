'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useRouter } from "next/navigation";

import SignUpButton from '@/components/SignUpButton';

export default function SignUpPage() {
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [error, setError] = useState<{ email?: string; password?: string; other?: string }>({});
  const router = useRouter();

  const onChangeEmailText = (value: string) => setEmailText(value);
  const onChangePasswordText = (value: string) => setPasswordText(value);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: 2,
        marginTop:10,
      }}
    >
      <Typography variant="h4">TRENDERへようこそ</Typography>

      {error?.other && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error.other}
        </Typography>
      )}

      <TextField
        label="メールアドレスを入力"
        value={emailText}
        onChange={(e) => onChangeEmailText(e.target.value)}
        error={error?.email !== undefined}
        helperText={error?.email}
        sx={{width:250}}
      />

      <TextField
        label="パスワードを入力"
        value={passwordText}
        onChange={(e) => onChangePasswordText(e.target.value)}
        type="password"
        error={error?.password !== undefined}
        helperText={error?.password}
        sx={{width:250}}

        
      />

      <SignUpButton email={emailText} password={passwordText} setError={setError}/>

      <Button
        variant="outlined"
        onClick={() => {
          const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          const N = 16;
          const randomString = Array.from(Array(N))
            .map(() => S[Math.floor(Math.random() * S.length)])
            .join('') + '@test.test';
          onChangeEmailText(randomString);
          onChangePasswordText('secret');
        }}
        sx={{width:200}}
      >
        default SignUp
      </Button>

      {/* デフォルトサインアップ (me) */}
      <Button
        variant="outlined"
        onClick={() => {
          onChangeEmailText('kurowassan55555@gmail.com');
          onChangePasswordText('secret');
        }}
        sx={{width:200}}

      >
        default SignUp (me)
      </Button>

      <Button
        variant="text"
        onClick={() => router.push('/home')}
        sx={{width:160}}

      >
        トップページに戻る
      </Button>
    </Box>
  );
}