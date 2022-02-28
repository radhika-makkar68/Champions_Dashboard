import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Button, Modal, Fade, AppBar, Tabs, Tab, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Login from "./Login";
import Signup from "./Register";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

const useStyles = makeStyles(() => ({
  paper: {
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0f0f0f",
    position: "absolute",
    top: "52%",
    left: "50%",
    width: 350,
    color: "white",
    margin: "auto",
    padding: "10px",
    borderRadius: "20px",
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenLogin(false);
  };

  const [value, setValue] = useState(0);

  const { setAlert, openLogin, setOpenLogin } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });

        return;
      });
  };

  useEffect(() => {
    if (openLogin) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [openLogin]);

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: { xs: 60, sm: 75 },
          height: 40,
          marginLeft: { xs: "5px", sm: "15px" },
          backgroundColor: "#47c2be",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{
                  backgroundColor: "black",
                }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>

            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
