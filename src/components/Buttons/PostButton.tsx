import { Button } from "@mui/material";
import {  db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAlert } from "@/context/AlertContext";
import { useSelector } from "react-redux";
import { reducerUser } from "@/redux/auth/authType";

const PostButton = ({content,state}:{content:string,state:(value:boolean)=>void}) => {
    const {showAlert} = useAlert()
    const user = useSelector((state :reducerUser) => state.auth.user);

    const addData = async () => {
        try{
            if(content.length == 0) return 
            if(user===null) return showAlert("認証エラー:サインインしなおしてください",'error')
            await addDoc(collection(db, 'posts'),{
                user_id:user.id,
                content:content,
                timestamp: new Date
            })
            showAlert('ポストしました', 'success')
            state(false)
        }catch(error){
            if(error instanceof Error){
                showAlert(error.message, 'error')
            }
        }
    }

    return(
        <Button variant='outlined' onClick={addData}>
            ポスト
        </Button>
    )
}

export default PostButton;