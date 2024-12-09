import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { auth, googleProvider } from "../../../firebase";
import {useAlert} from '../../context/AlertContext';


export const PopupGoogleSigninButton = () => {
    const navigate = useNavigate()
    const { showAlert } = useAlert()
    const PopupsigninWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {
                navigate("/home")
                showAlert("TRNDERへようこそ！", "welcome")
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    }
    return (
        <Button variant="outlined" onClick={PopupsigninWithGoogle} startIcon={
            <img
                src="/google.png" 
                alt="Google"
                width={24}
                height={24}
            />
        }
            sx={{ borderRadius: 15, color: "blue" }}
        >
            Googleでサインイン
        </Button>
    );
}


interface SignUpError {
    email?:string,
    password?:string,
    other?:string,
}

interface SignUpButtonProps {
    email:string,
    password:string,
    setError:(value:SignUpError)=>void,
}

export const SignUpButton : React.FC<SignUpButtonProps> = ({email, password, setError}) => {
    const navigate = useNavigate();
    const handleSignUpButton = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/auth/signup/sendEmail');
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
        <Button variant="contained" onClick={handleSignUpButton}>メールアドレスで続行</Button>
    )

}

type SignInError = {
    email?:string,
    password?:string,
    other?:string,
}

export const SignInButton = ({
    email,
    password,
    setError
}:{
    email:string,
    password:string,
    setError:(value: SignInError) =>void
}) => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const handleSigninButton = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/home');
                showAlert("おかえりなさい！", "welcome")
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
        <Button variant="contained" onClick={handleSigninButton}>サインイン</Button>
    )
}



