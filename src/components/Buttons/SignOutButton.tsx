import { signOut } from "firebase/auth"
import { auth } from "../../../firebase"
import { Button } from "@mui/material"
import { useAlert } from "@/context/AlertContext"
import { useRouter } from "next/navigation"

const SignOutButton = () => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        showAlert("ログアウトしました", "success");
        router.push("/")
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <Button variant="outlined" onClick={signOutFunc}>ログアウト</Button>
  )
}

export default SignOutButton;