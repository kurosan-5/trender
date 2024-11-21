"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useAuthActions } from "@/redux/auth/useActions";
import { Button } from "@mui/material";
import PostButton from "@/components/Buttons/PostButton";
import ShowPostButton from "@/components/ShowButtons/ShowPostButton";
import ShowPostIndex from "@/components/Indexs/ShowPostIndex";
import RecipeReviewCard from "@/components/Cards/PostCard";

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
        <RecipeReviewCard />
        <ShowPostIndex />
          <ShowPostButton />
        </>
    )
}