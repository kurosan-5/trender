'use client'
import { sendEmailVerification } from "firebase/auth"
import { useRouter } from "next/navigation";
import { auth } from "../../../../../firebase";
import { useEffect, useState } from "react";
import { Typography, Button, Box } from '@mui/material';


const SendEmail = () => {
    const router = useRouter();

    useEffect(() => {
        const sendEmail = () => {
            if (auth.currentUser) {
                sendEmailVerification(auth.currentUser)
                    .catch((error) => {
                        console.error(error);
                    })

            }
        }
        sendEmail();
    }, [])


    useEffect(() => {

        const intervalId = setInterval(() => {
            if (auth.currentUser) {
                auth.currentUser.reload().then(() => {
                    if (auth.currentUser!.emailVerified) {
                        clearInterval(intervalId); // ポーリング停止
                        router.push("/home"); // Home 画面に移動

                    }
                }).catch(error => console.error("Failed to reload user:", error));
            }
        }, 3000); // 3秒ごとに確認

        // コンポーネントがアンマウントされたときにポーリングを停止
        return () => clearInterval(intervalId);
    }, [router]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 2,
                gap: 2,
            }}
        >
            <Typography variant="h4">受信ボックスを確認</Typography>

            <Typography
                variant="body1"
                sx={{ marginTop: 2, marginBottom: 4, width: '60%' }}
            >
                送信されたメールのリンクをタップしてセットアップを完了してください
            </Typography>

            <Typography variant="body2" sx={{ marginTop: 1 }}>
                メールが来ない方は以下をタップして再送信
            </Typography>

            <ResendEmailButton />

            <Button
                variant="text"
                onClick={() => router.push('/home')}
                sx={{ marginTop: 4 }}
            >
                トップページに戻る
            </Button>
        </Box>
    )
}

const ResendEmailButton = () => {
    const sendEmail = () => {
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser)
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const startCountdown = () => {
        setCountdown(300); // 300秒（5分）からスタート
        setIsButtonDisabled(true);

        // タイマーを開始
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(intervalId);
                    setIsButtonDisabled(false); // ボタンを再度有効化
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000); // 1秒ごとにカウントダウン
    };

    const handlePress = () => {
        if (!isButtonDisabled) {
            sendEmail()
            startCountdown();
        }
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Button
                variant="text"
                disabled={isButtonDisabled}
                onClick={handlePress}
                sx={{
                    color: isButtonDisabled ? 'grey' : 'blue',
                    padding: 0,
                }}
            >
                メールを再送信する
            </Button>

            {isButtonDisabled && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                    もう一度押せるまで: {Math.floor(countdown / 60)}:
                    {String(countdown % 60).padStart(2, '0')}
                </Typography>
            )}
        </Box>
    );
}



export default SendEmail;