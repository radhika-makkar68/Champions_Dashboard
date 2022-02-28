import React from "react";
import { makeStyles } from "@mui/styles";

function ButtonComp({ children, selected, onClick }) {
  const useStyles = makeStyles(() => ({
    button: {
      border: "1px solid #47c2be",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#47c2be" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        backgroundColor: "#47c2be",
        color: "black",
      },
      width: "30%",
      margin: 5,
    },
  }));

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.button}>
      {children}
    </span>
  );
}

export default ButtonComp;
