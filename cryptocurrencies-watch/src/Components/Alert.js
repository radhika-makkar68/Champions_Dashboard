import React from "react";
import { CryptoState } from "../CryptoContext";
import MUIAlert from "@mui/material/Alert";
import SnackBar from "@mui/material/Snackbar";

function Alert() {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <SnackBar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MUIAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MUIAlert>
    </SnackBar>
  );
}

export default Alert;
