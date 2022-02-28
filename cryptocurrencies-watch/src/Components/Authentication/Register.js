import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords don't match!",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
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
      <TextField
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Enter Confirm Password"
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#47c2be" }}
        onClick={handleSubmit}
      >
        SIGN UP
      </Button>
    </Box>
  );
}

export default Register;
