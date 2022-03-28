import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import { makeStyles } from "@mui/styles";
import ProtectedRoute from "./Authentication/ProtectedRoute";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/details" element={<Detail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
