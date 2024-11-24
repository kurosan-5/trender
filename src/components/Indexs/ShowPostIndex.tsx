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
        <Modal
                open={open}
                onClose={() => toggleOpen(false)}
            >
                <Grid2
                    direction="column"
                    spacing={5}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'right'
                    }}
                >
                    <Grid2 sx={{display:"flex", flexDirection:"column" , alignItems: "center", marginBottom:2}}>

                        <Typography>本当にこの{message}を削除しますか？</Typography>
                        <Typography variant="body2" sx={{color:'text.secondary'}}>この操作は元に戻せません</Typography>
                    </Grid2>
                    <Grid2>
                        <Button onClick={() => {
                            toggleOpen(false);
                            setIsOK(true);
                        }}>
                            はい
                            </Button>
                        <Button onClick={() => {
                            toggleOpen(false);
                            setIsOK(false);
                        }}>
                            いいえ
                            </Button>
                    </Grid2>
                </Grid2>
            </Modal>
            {posts.map((post) => {
                return <PostViewCard key={post.id} post={post} toggle={toggleOpen} isOK={isOK} setIsOK={setIsOK} setModalMessage={setModalMessage}/>
            })}
        </>
    )
}

export default ShowPostIndex;

