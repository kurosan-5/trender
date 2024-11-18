'use client'
import { useAlert } from "@/context/AlertContext";
import { Snackbar, Alert } from "@mui/material";
import WavingHandIcon from '@mui/icons-material/WavingHand';

const ShowAlert = () => {
  const { message, type, clearAlert } = useAlert();

  return message ? (
    <Snackbar open={true} autoHideDuration={3000} onClose={clearAlert} anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ width: "100%", marginTop: 5 }}>
      {type === "welcome" ? (

        <Alert
          icon={<WavingHandIcon sx={{ color: "white" }} />}
          severity='success'
          onClose={clearAlert}
          sx={{
            width: "60%",
            fontSize: 20,
            color: "#523701",
            backgroundColor: "#ff8c40"
          }}
        >
          {message}
        </Alert>

      ) : (
        <Alert
          severity={type}
          onClose={clearAlert}
          sx={{
            width: "60%",
          }}
        >
          {message}
        </Alert>

      )}

    </Snackbar>
  ) : null;
};

export default ShowAlert;