import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAlert } from "@/context/AlertContext";
import { SetState } from "@/globalType";
import { auth } from "../../../firebase";

type SignInError = {
    email?:string,
    password?:string,
    other?:string,
}

const SignInButton = ({
    email,
    password,
    setError
}:{
    email:string,
    password:string,
    setError:SetState<SignInError>
}) => {
    const router = useRouter();
    const { showAlert } = useAlert();
    const handleSigninButton = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/home');
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

export default SignInButton;