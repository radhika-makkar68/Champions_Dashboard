import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthHandler from "./Authentication/AuthHandler";
import Logout from "./Authentication/Logout";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

function Header() {
  const { currency, setCurrency, user } = CryptoState();

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate(`/`)}
              sx={{
                flex: 1,
                color: "#47c2be",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: { md: "35px", sm: "30px", xs: "25px" },
              }}
            >
              Crypto Finder
            </Typography>

            <Select
              variant="outlined"
              value={currency}
              autoWidth
              sx={{
                color: "white",
                fontSize: 20,
                height: 40,
              }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"CAD"}>CAD</MenuItem>
              <MenuItem value={"EUR"}>EURO</MenuItem>
            </Select>
            {user ? <Logout /> : <AuthHandler />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
