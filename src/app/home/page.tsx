"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useAuthActions } from "@/redux/auth/useActions";
import DashboardLayoutBasic from "@/components/DashBoard";

export default function Home() {
    const {setUser, resetUser} = useAuthActions()
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUser({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified
              });
        } else {
          resetUser();
        }
      });

    return (
        <>
            <DashboardLayoutBasic />
        </>
    )
}