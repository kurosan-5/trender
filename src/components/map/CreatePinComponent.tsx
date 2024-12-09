import { Avatar, TextField } from "@mui/material";
import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { PostButton } from "./buttons";
import { red } from "@mui/material/colors";
import styled from "@emotion/styled";
import L from "leaflet";

// マーカーアイコンのカスタム設定
const customRedIcon = new L.Icon({
    iconUrl: '/customMarker.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [60,60],
    iconAnchor: [30, 41],
    popupAnchor: [1, -34],
    shadowAnchor:[10,35],
    shadowSize: [41, 41],
  });
  

const CreatePinComponent = ({ position, state }: { position: any, state: (value: [number, number] | null) => void }) => {

    const [postText, onchangePostText] = useState("");

    return (
        <>
            <Marker position={position} icon={customRedIcon}>
                <StyledPopup
                    autoClose={false}
                    closeOnClick={false}
                >
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
                            <PostButton content={postText} position={position} state={state} />
                        </div>
                    </div>
                </StyledPopup>
            </Marker>
        </>

    )
}

const StyledPopup = styled(Popup)`
  .leaflet-popup-content{
    margin:0; 
    display:flex;
    
    padding-left:10px;
    padding-right:18px;

  }


  .leaflet-popup-content-wrapper {
    padding: 0; 
    margin: 0;
    height: 40px;
    display:flex;
    justify-content:center;
  }
`;

export default CreatePinComponent;