import { Button, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom';


function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", height: "100vh", width:"100vw" }}>

        <div className="d-flex">
          <Typography variant="h3" component="h3">
            Welcome To
          </Typography>
          <img style={{width:"auto", height:"100px" }} src="/Title.png" alt="logo" width="300" height="100"/>


        </div>

        <Button
          variant="contained"
          sx={{ marginTop: 5, backgroundColor: "black" }}
          onClick={() => {
            navigate("/auth")
          }}>
          今すぐ始める
        </Button>
      </div>
    </>
  )
}

export default Welcome
