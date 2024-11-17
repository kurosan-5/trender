import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../../firebase';
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { useState } from 'react';
import { styles } from '../StyleSheet';
const Register = () => {

    const navigation = useNavigation();

    const [emailText, onChangeEmailText] = useState('');
    const [passwordText, onChangePasswordText] = useState('');
    const [error, setError] = useState();

    const pressRegisterButton = async () => {
        const credential = EmailAuthProvider.credential(emailText, passwordText)
        linkWithCredential(auth.currentUser, credential)
            .then(() => {
                navigation.navigate('sendEmail');
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
                if (errorCode === 'auth/invalid-email') {
                    setError({ email: 'メールアドレスの形式が違います' });
                } else if (errorCode === 'auth/user-not-found') {
                    setError({ email: 'このメールアドレスは登録されていません' });
                } else if (errorCode === 'auth/wrong-password') {
                    setError({ password: 'パスワードが正しくありません' });
                } else if (errorCode === 'auth/email-already-in-use') {
                    setError({ email: 'このメールアドレスは既に使用されています' });
                } else if (errorCode === 'auth/missing-email') {
                    setError({ email: 'メールアドレスを入力してください' });
                } else if (errorCode === 'auth/missing-password') {
                    setError({ password: 'パスワードを入力してください' });
                } else if (errorCode === 'auth/weak-password') {
                    setError({ password: 'パスワードが簡単すぎます' });
                } else {
                    setError({ other: 'エラーが発生しました。再度お試しください。' });
                }
            })

    }

    return (
        <View style={styles.container}>
            <Text>
                Register Form
            </Text>

            {error ? <Text style={[styles.text, { color: "#f00", marginTop: 10, }]}>{error.other}</Text> : <></>}

            <TextInput
                style={{ height: 40, width: 200, marginTop: 12, borderWidth: 1, padding: 10 }}
                onChangeText={onChangeEmailText}
                value={emailText}
                placeholder='input email'
            />

            {error ? <Text style={[styles.text, { color: "#f00" }]}>{error.email}</Text> : <></>}


            <TextInput
                style={{ height: 40, width: 200, marginTop: 12, borderWidth: 1, padding: 10 }}
                onChangeText={onChangePasswordText}
                value={passwordText}
                placeholder='input password'
            />

            {error ? <Text style={[styles.text, { color: "#f00" }]}>{error.password}</Text> : <></>}

            <Button
                title="default register"
                onPress={() => {
                    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                    var N = 16
                    randomstring = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('')
                    randomstring += "@test.test"
                    onChangeEmailText(randomstring);
                    onChangePasswordText("secret");
                }}

            />
            <Button
                title="default register(me)"
                onPress={() => {
                    onChangeEmailText("kurowassan55555@gmail.com");
                    onChangePasswordText("secret");
                }}

            />

            <Button
                title='Register'
                onPress={pressRegisterButton}
            />

            <Button
                title='Go to Home'
                onPress={() => {
                    navigation.navigate('home')
                }}
            />
        </View>
    );
}

export default Register;