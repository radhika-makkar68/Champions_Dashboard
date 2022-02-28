import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

function Login({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields!",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Enter email"
        variant="outlined"
        fullWidth
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Enter Password"
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#47c2be" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
}

export default Login;
