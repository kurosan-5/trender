'use client'
import { useAlert } from "@/context/AlertContext";
import { Snackbar, Alert } from "@mui/material";
import WavingHandTwoToneIcon from '@mui/icons-material/WavingHandTwoTone';
const ShowAlert = () => {
  const { message, type, clearAlert } = useAlert();

  return message ? (
    <Snackbar open={true} autoHideDuration={3000} onClose={clearAlert} anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ width: "100%", marginTop: 7 }}>
      {type === "welcome" ? (

        <Alert
          icon={<WavingHandTwoToneIcon sx={{ color: "black" }} />}
          severity='success'
          onClose={clearAlert}
          sx={{
            fontSize: 14,
            color: "black",
            backgroundColor: "rgba(255, 214, 255,0.8)"
          }}
          action=''
        >
          {message}
        </Alert>

      ) : (
        <Alert
          severity={type}
          onClose={clearAlert}
          icon={<></>}
          action=''
        >
          {message}
        </Alert>

      )}

    </Snackbar>
  ) : null;
};

export default ShowAlert;