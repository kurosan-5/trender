import { Grid2, Avatar, Typography, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";

const Comment = () => {
    return (
        <Grid2
            direction="column"
        sx={{paddingBottom:1}}
        >
            <Grid2
                direction="row"
                container
                spacing={2}
            >
                <Grid2>
                    <Avatar sx={{ bgcolor: green[500], fontsize: 20, width: 37, height: 37, marginTop: 1 }} aria-label="recipe">
                        S
                    </Avatar>
                </Grid2>
                <Grid2>
                    <Typography sx={{ color: "text.secondary" }}>user name</Typography>
                    <Typography sx={{ color: "text.secondary" }}>date</Typography>
                </Grid2>
            </Grid2>
            <Typography
                sx={{
                    marginTop: 1
                }}
            >this is S's Comment</Typography>
        </Grid2>
    )
}


export default Comment;