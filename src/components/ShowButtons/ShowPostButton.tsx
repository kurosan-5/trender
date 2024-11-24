import { Fab, Grid2, Modal, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import PostButton from "../Buttons/PostButton";
import AddIcon from '@mui/icons-material/Add';
const ShowPostButton = () => {
    const [text, onChangeText] = useState('');
    const [open, toggleOpen] = useState(false);
    return (
        <>
            <Modal
                open={open}
                onClose={() => toggleOpen(false)}
            >
                <Grid2
                    direction="column"
                    spacing={2}
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
                    <Grid2>
                        <TextField
                            multiline
                            fullWidth
                            rows={4}
                            label="今日の思い出をシェア"
                            onChange={(e) => onChangeText(e.target.value)}
                            sx={{ marginBottom: 2 }}

                        />
                    </Grid2>
                    <Grid2>
                        <PostButton content={text} state={toggleOpen} />
                    </Grid2>
                </Grid2>
            </Modal>
            <Fab
                onClick={() => toggleOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                }}
            >
                <AddIcon sx={{ fontSize: 30 }} /></Fab>

        </>
    )
}

export default ShowPostButton;