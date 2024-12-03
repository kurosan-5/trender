import { IconButton } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import { Post } from "../Indexs/ShowPostIndex";
import { db } from "../../../firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { reducerUser } from "@/redux/auth/authType";

const CommentButton = ({post, content, close, clear}:{post:Post, content:string, close:(value:boolean)=>void, clear:(value:string)=>void}) => {
    const user = useSelector((state: reducerUser) => state.auth.user)
    const handleComment= async ()=>{
        const postRef = doc(db, "posts", post.id);
        if(user){
            await addDoc(collection(postRef, "comments"), {
                content:content,
                user_id:user.id,
                timestamp: new Date(),
                user_icon:user.photoURL,
                user_name:user.name,
            })
        }
    }

    return (
        <IconButton sx={{ marginRight: .5 }} onClick={() => {
            handleComment();
            close(false)
            clear('')
        }}>
            <ReplyIcon sx={{ fontSize: 32, color: "rgb(11, 120, 255)" }} />
        </IconButton>
    )
}

export default CommentButton;