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
          icon={<WavingHandTwoToneIcon sx={{ color: "white" }} />}
          severity='success'
          onClose={clearAlert}
          sx={{
            fontSize: 14,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.82)"
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