import { collection, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import PostViewCard from "../Cards/PostCard";
import {  Button, Grid2, Modal, Typography } from "@mui/material";


export interface Post {
    id:string,
    user_id:string,
    content: string,
    timestamp: Timestamp,
    image?:string,
}

const ShowPostIndex = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [open, toggleOpen] = useState(false)
    const [message, setModalMessage] = useState("");
    const [isOK, setIsOK] = useState(false);

    const fetchPostData = async () => {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        setPosts(querySnapshot.docs.map((post) => {
            const data = post.data()
            return {
                id: post.id,
                user_id:data.user_id,
                content: data.content,
                timestamp: data.timestamp
            }
        }))
    }

    useEffect(() => {
        fetchPostData()
        onSnapshot(collection(db, 'posts'), (snapshot) => {
            setPosts(snapshot.docs.map((post) => {
                const data = post.data()
                return {
                    id: post.id,
                    user_id:data.user_id,
                    content: data.content,
                    timestamp: data.timestamp
                }
            }))
        })
    }, [])

    return (
        <>
            
        </>
    )
}

export default ShowPostIndex;

