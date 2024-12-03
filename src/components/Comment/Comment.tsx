import { Grid2, Avatar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Post } from "../Indexs/ShowPostIndex";
import { db } from "../../../firebase";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { getTimeDifference } from "../Cards/PostCard";
import { useSelector } from "react-redux";
import { reducerUser } from "@/redux/auth/authType";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CommentProp {
    id: string,
    content: string,
    timestamp: string,
    user_id: string,
    user_icon: string,
    user_name: string,
}


const Comment = ({ post, toggle, isOK, setIsOK, setModalMessage }: { post: Post, toggle: (value: boolean) => void, isOK: boolean, setIsOK: (value: boolean) => void, setModalMessage: (value: string) => void }) => {
    const [datas, setData] = useState<CommentProp[]>([]);

    const fetchComment = async () => {
        const postRef = doc(db, "posts", post.id);
        const commentRef = collection(postRef, "comments");
        const commentSnapshot = await getDocs(commentRef);

        const commentDatas = commentSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: getTimeDifference(doc.data().timestamp),
        }
        ));
        setData(commentDatas as CommentProp[]);
    }

    useEffect(() => {
        fetchComment();
        onSnapshot(collection(doc(db, "posts", post.id), 'comments'), (snapshot) => {
            setData(snapshot.docs.map((commentSnap) => ({
                ...commentSnap.data(),
                id: commentSnap.id,
                timestamp: getTimeDifference(commentSnap.data().timestamp),
            }
            )) as CommentProp[])
        })
    }, [])

    const handleDelete = async () => {
        toggle(true);
        setModalMessage('コメント')
        setIsOK(false)
    }

    return (
        <>
            {datas.map((comment) => (
                <Grid2
                    direction="column"
                    sx={{ paddingBottom: 1 }}
                    key={comment.id}
                >
                    <Grid2
                        direction="row"
                        container
                        spacing={2}
                    >
                        <Grid2>
                            <Avatar sx={{ bgcolor: green[500], fontsize: 20, width: 37, height: 37, marginTop: 1 }} aria-label="recipe" src={comment.user_icon} />

                        </Grid2>
                        <Grid2>
                            <Typography sx={{ color: "text.secondary" }}>{comment.user_name}</Typography>
                            <Typography sx={{ color: "text.secondary" }}>{comment.timestamp}</Typography>
                        </Grid2>
                        <CommentMenu post={post} isOK={isOK} comment={comment} handleDelete={handleDelete}/>
                    </Grid2>
                    <Typography
                        sx={{
                            marginTop: 1
                        }}
                    >{comment.content}</Typography>
                </Grid2>
            ))}
        </>

    )
}


const CommentMenu = ({post, isOK, comment, handleDelete}: {post:Post, isOK:boolean, comment:CommentProp, handleDelete:()=>void}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const user = useSelector((state: reducerUser) => state.auth.user)
  const open = Boolean(anchorEl);


    const handleMore = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    useEffect(() => {
        if (isOK) {
            deleteDoc(doc(db, "posts", post.id, 'comments', comment.id));
        }
    }, [isOK])

    return (
        <Grid2>
            {user!.id != comment.user_id ? null : (
                <IconButton aria-label="settings" onClick={handleMore}>
                    <MoreVertIcon />
                </IconButton>
            )}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        handleDelete();
                    }}
                >
                    このコメントを削除する
                </MenuItem>
            </Menu>
        </Grid2>

    )
}

export default Comment;