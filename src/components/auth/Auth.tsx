import { PopupGoogleSigninButton } from "./buttons";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Auth = () => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ height: '85vh', gap: 2 }}
            >
                <Typography variant="h3"sx={{marginBottom:5, padding:5, textAlign:"center"}} component="h3">TRENDERを始めよう</Typography>

                <PopupGoogleSigninButton />
                <Link to="/auth/signin">
                    <Button variant="contained" sx={{width:200}}>
                        サインイン
                    </Button>
                </Link>
                <Link to="/auth/signup">
                    <Button variant="contained" sx={{width:200}}>
                        新規登録
                    </Button>
                </Link>
            </Box>
        </>
    )
}
export default Auth;