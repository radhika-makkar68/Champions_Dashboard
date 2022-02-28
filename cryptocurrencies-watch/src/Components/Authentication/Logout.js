import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Fade, AppBar, Modal, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const useStyles = makeStyles(() => ({
  container: {
    background: "black",
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
}));

function Logout() {
  const { user, setAlert } = CryptoState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });
  };

  return (
    <>
      <Avatar
        onClick={handleOpen}
        style={{
          height: 38,
          width: 38,
          marginLeft: 15,
          cursor: "pointer",
          backgroundColor: "#47c2be",
        }}
        src={user.photoURL}
        alt={user.displayName || user.email}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper">
            <AppBar position="static">
              <div className={classes.container}>
                <div className={classes.profile}>
                  <Avatar
                    className={classes.picture}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  />
                  <span
                    style={{
                      width: "100%",
                      fontSize: 25,
                      textAlign: "center",
                      fontWeight: "bolder",
                      wordWrap: "break-word",
                    }}
                  >
                    {user.displayName || user.email}
                  </span>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#47c2be" }}
                    fullWidth
                    onClick={logOut}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </AppBar>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default Logout;
