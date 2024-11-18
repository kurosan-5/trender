import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { auth, googleProvider } from "../../../firebase";
import { useAlert } from "@/context/AlertContext";
import Image from 'next/image';

const PopupGoogleSigninButton = () => {
    const router = useRouter()
    const { showAlert } = useAlert()
    const PopupsigninWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {
                router.push("/home")
                showAlert("TRNDERへようこそ！", "welcome")
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    }
    return (
        <Button variant="outlined" onClick={PopupsigninWithGoogle} startIcon={
            <Image
                src="/google.png" 
                alt="Google"
                style={{ width: "24px", height: "24px" }}
            />
        }
            sx={{ borderRadius: 15, color: "blue" }}
        >
            Googleでサインイン
        </Button>
    );
}

export default PopupGoogleSigninButton;
