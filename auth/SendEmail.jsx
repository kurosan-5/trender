import { sendEmailVerification } from "firebase/auth"
import { Button, View, Text, StyleSheet } from "react-native"
import { auth } from "../../firebase"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { useSnack } from "../../redux/snack/useSnack"
import { styles } from "../StyleSheet"


const SendEmail = () => {
    const navigation = useNavigation();
    const { setSnack } = useSnack();

    useEffect(() => {
        const sendEmail = () => {
            sendEmailVerification(auth.currentUser)
                .catch((error) => {
                    console.error(error);
                })
        }
        sendEmail();
    },[])


    useEffect(() => {

        const intervalId = setInterval(() => {
            auth.currentUser.reload().then(() => {
                if (auth.currentUser.emailVerified) {
                    clearInterval(intervalId); // ポーリング停止
                    navigation.navigate("home"); // Home 画面に移動
                    setSnack("登録が完了しました。", "success")

                }
            }).catch(error => console.error("Failed to reload user:", error));
        }, 3000); // 3秒ごとに確認

        // コンポーネントがアンマウントされたときにポーリングを停止
        return () => clearInterval(intervalId);
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <Text>まだ登録できておりません</Text>
            <Text>メールが送信されるのでアドレスを認証してください</Text>
            <Text style={{ marginTop: 20 }}>メールが来ない方へ</Text>
            <ResendEmailButton />
            <Button
                title="Go to Home"
                onPress={() => {
                    navigation.navigate("home")
                }}
            />
        </View>
    )
}

const ResendEmailButton = () => {
    const sendEmail = () => {
        sendEmailVerification(auth.currentUser)
            .catch((error) => {
                console.error(error);
            })
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
        <View style={{ justifyContent: "center" }}>

            <Button
                disabled={isButtonDisabled}
                title="メールを再送信する"
                onPress={handlePress}
                style={{
                    color: isButtonDisabled ? "grey" : "blue",
                    padding: 10,
                    borderRadius: 5,
                }}
            />
            {isButtonDisabled && (
                <Text style={{ margin: 15 }}>
                    もう一度押せるまで: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, "0")}
                </Text>
            )}
        </View>
    );
}



export default SendEmail;