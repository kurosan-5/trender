import { Button, Grid2, Modal, TextField } from "@mui/material";
import { useState } from "react";
import PostButton from "../Buttons/PostButton";

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
                        borderRadius:2,
                        boxShadow: 24,
                        p: 4,
                        textAlign:'right'
                    }}
                >
                    <Grid2>
                        <TextField
                            multiline
                            fullWidth
                            focused
                            rows={4}
                            label="ポストの内容"
                            onChange={(e) => onChangeText(e.target.value)}
                            sx={{marginBottom:1}}
                        />
                    </Grid2>
                    <Grid2>
                        <PostButton content={text} state={toggleOpen} />
                    </Grid2>
                </Grid2>
            </Modal>
            <Button variant="outlined" onClick={() => toggleOpen(true)} >ポストする</Button>

        </>
    )
}

export default ShowPostButton;