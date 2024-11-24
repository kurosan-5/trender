import { Fab, Grid2, IconButton, Modal, TextField } from "@mui/material";
import { useState } from "react";
import PostButton from "../Buttons/PostButton";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
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
                    columnSpacing={2}
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
                        textAlign: 'right',
                        paddingTop:1,
                        paddingRight:0
                    }}
                >
                    <IconButton onClick={() => toggleOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Grid2 sx={{marginRight:4}}>
                        <TextField
                            multiline
                            fullWidth
                            rows={4}
                            label="今日の思い出をシェア"
                            onChange={(e) => onChangeText(e.target.value)}
                            sx={{ marginBottom: 2 }}

                        />
                    </Grid2>
                    <Grid2 sx={{marginRight:4}}>
                        <PostButton content={text} state={toggleOpen} />
                    </Grid2>
                </Grid2>
            </Modal>
            <Fab
            color="secondary"
                onClick={() => toggleOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                }}
            >
                <AddIcon sx={{ fontSize: 30 }}/></Fab>

        </>
    )
}

export default ShowPostButton;