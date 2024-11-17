'use client'
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { SetState } from "@/globalType";
import React from "react";
import { Button } from "@mui/material";

interface SignInError {
    email?:string,
    password?:string,
    other?:string,
}

interface SignInButtonProps {
    email:string,
    password:string,
    setError:SetState<SignInError>
}

const SignUpButton : React.FC<SignInButtonProps> = ({email, password, setError}) => {
    const router = useRouter();
    const handleSignInButton = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/auth/signup/sendEmail');
            })
            .catch((error) => {
                const errorCode = error.code;
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
        <Button variant="contained" onClick={handleSignInButton}>メールアドレスで続行</Button>
    )

}

export default SignUpButton;