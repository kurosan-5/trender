import { sendPasswordResetEmail } from "firebase/auth";
import { Button, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../StyleSheet";

const ResetPassword = () => {

    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text>パスワードを再設定するためのメールを送ります。</Text>
            <ResetPasswordButton />
            <Button
                title="Go to Home"
                onPress={() => {
                    navigation.navigate("home")
                }}
            />
        </View>
    );
}

const ResetPasswordButton = () => {
    const sendResetPassword = () => {
        sendPasswordResetEmail(auth, auth.currentUser.email)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage)
            })
    }

    return (
        <Button
            title="パスワードを再設定する"
            onPress={sendResetPassword}
        />
    )
}

export default ResetPassword;