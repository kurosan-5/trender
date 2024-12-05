import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import PostButton from "../Buttons/PostButton";

const CreatePinComponent = ({ position, icon }: { position: any, icon: any }) => {

    const [postText, onchangePostText] = useState("");
    console.log(position);

    return (
        <Marker position={position} icon={icon}>
            <Popup>
                <Box display="flex" alignItems="center" gap={1}>
                    <Avatar alt="Ann" sx={{ width: 32, height: 32 }} />
                    <Typography variant="caption" fontWeight="bold">
                        Ann 2024/12/03
                    </Typography>
                </Box>
                <TextField
                    multiline
                    rows={4}
                    label="ポスト"
                    value={postText}
                    fullWidth
                    onChange={(e) => onchangePostText(e.target.value)}
                    sx={{marginTop:2, marginBottom:2}}
                />
                <PostButton content={postText} position={position}/>

                 </Popup>
        </Marker>
    )
}

export default CreatePinComponent;