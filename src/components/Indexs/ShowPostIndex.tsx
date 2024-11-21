import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { Card, CardHeader, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface Post {
    id:string,
    user_id:string,
    content: string,
    timestamp: Date,
    image?:string,
}

const ShowPostIndex = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPostData = async () => {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        setPosts(querySnapshot.docs.map((post) => {
            const data = post.data()
            return {
                id: data.id,
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
                    id: data.id,
                    user_id:data.user_id,
                    content: data.content,
                    timestamp: data.timestamp
                }
            }))
        })
    }, [])

    console.log(posts)

    return (
        <>
            {posts.map((post) => {
                return <h1 key={post.id}>{post.content}</h1>
            })}
        </>
    )
}

const Post = () => {
    return (
        <Card>
            <CardHeader>

            </CardHeader>
        </Card>
    )
}

export default ShowPostIndex;

