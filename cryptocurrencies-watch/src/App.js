import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import { makeStyles } from "@mui/styles";
import Alert from "./Components/Alert";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";

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
          <Route exact path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/coins/:id" element={<Detail />} />
          </Route>
        </Routes>
      </div>
      <Alert />
    </Router>
  );
}

export default App;
