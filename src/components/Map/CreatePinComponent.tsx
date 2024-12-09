import { Avatar, TextField } from "@mui/material";
import { useState } from "react";
import PostButton from "../Buttons/PostButton";
import styled from "@emotion/styled";
import { Position } from "./map";
import L from 'leaflet';
import { red } from "@mui/material/colors";
const CreatePinComponent = ({ position, icon, map }: { position: Position, icon: L.Icon, map:L.Map }) => {

    const [postText, onchangePostText] = useState("");

    // const date = new Date();
    // const now = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    // const user = useSelector((state: reducerUser) => state.auth.user)

    return (
        <>
            <div style={{ padding: 0, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: red[500], width: 30, height: 30, marginRight: '6px' }} aria-label="recipe">
                    R
                </Avatar>
                <div style={{ padding: 0, display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                    <TextField
                        label="ここはどんな場所？"
                        value={postText}
                        fullWidth
                        onChange={(e) => onchangePostText(e.target.value)}
                        focused
                        sx={{
                            width: '150px',
                            height: '36px',
                            fontFamily: "system-ui",
                            padding: 0,
                            fontWeight: "bold",
                            marginRight: 1,
                            display: 'flex',
                            alignItems: 'center',
                            '& input': {
                                height: '100%',
                                padding: 1,
                                lineHeight: '36px',
                                boxSizing: 'border-box',
                                display: 'flex',
                            }
                        }}
                    />
                    <PostButton content={postText} position={position} />
                </div>
            </div>
        </>

    )
}

// const StyledPopup = styled(Popup)`
//   .leaflet-popup-content{
//     margin:0;
//     display:flex;

//     padding-left:10px;
//     padding-right:18px;

//   }


//   .leaflet-popup-content-wrapper {
//     padding: 0;
//     margin: 0;
//     height: 40px;
//     display:flex;
//     justify-content:center;
//   }
// `;

export default CreatePinComponent;