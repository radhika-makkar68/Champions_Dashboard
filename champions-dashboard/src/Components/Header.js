import {
  AppBar,
  Container,
  Button,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

function Header() {
  const navigate = useNavigate();
  const watchlist = useSelector((state) => state.WatchListReducer.watchlist);
  const count = watchlist.length;

  const handleWatchListClick = () => {
    navigate("/details");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate(`/`)}
              sx={{
                flex: 1,
                color: "#ffc400",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: { md: "35px", sm: "30px", xs: "25px" },
              }}
            >
              Champions Dashboard
            </Typography>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#ffc400" }}
              onClick={handleWatchListClick}
            >
              Watch List :
              <Typography sx={{ marginLeft: "10px", fontWeight: "800" }}>
                {count}
              </Typography>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
