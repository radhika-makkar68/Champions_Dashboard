import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Paper,
  TextField,
  Button,
  Modal,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  GetChampions,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../Services/Actions/Action";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const useStyles = makeStyles((darkTheme) => ({
  searchBox: {
    padding: 30,
    color: "red",
  },
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#ffc400",
    },
  },
  sticky: {
    position: "sticky",
    left: 0,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0f0f0f",
    position: "absolute",
    top: "30%",
    left: "50%",
    width: 350,
    color: "white",
    margin: "auto",
    padding: "10px",
    borderRadius: "20px",
    textAlign: "center",
    border: "1px solid #ffc400",
  },
}));

function TableComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [sort, setSort] = useState("name");

  useEffect(() => {
    dispatch(GetChampions(sort));
  }, [sort]);

  const champions1 = useSelector((state) => state.ChampionsReducer);
  const watchlist = useSelector((state) => state.WatchListReducer.watchlist);

  const classes = useStyles();

  const handleSearch = () => {
    return (
      champions1.champions &&
      champions1.champions.filter(
        (champion) =>
          champion.name.toUpperCase().includes(search) ||
          champion.name.toLowerCase().includes(search)
      )
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Champions Details
        </Typography>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Sort By Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="name">Ascending</MenuItem>
            <MenuItem value="-name">Descending</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{ marginBottom: 20, width: "100%", marginTop: 20 }}
          label="Search for a Champion"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#ffc400" }}>
                <TableRow>
                  {["Name", "Move Speed", "Armor", "Attack Range", ""].map(
                    (el) => (
                      <TableCell
                        style={{
                          color: "white",
                          fontWeight: 600,
                          fontFamily: "Montserrat",
                          backgroundColor: "#ffc400",
                        }}
                        key={el}
                        align={el === "Name" ? "left" : "right"}
                      >
                        {el}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((champion) => {
                    const isThere = watchlist.filter(
                      (x) => x.id == champion.id
                    );
                    return (
                      <>
                        <TableRow className={classes.row} key={champion.name}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <img
                              src={champion?.image_url}
                              alt={champion.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                                onClick={() => {
                                  handleOpen();
                                  setData(champion);
                                }}
                              >
                                {champion.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {champion.movespeed}
                          </TableCell>
                          <TableCell align="right">{champion.armor}</TableCell>
                          <TableCell align="right">
                            {champion.attackrange}
                          </TableCell>
                          <TableCell>
                            {isThere.length == 0 ? (
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "#ffc400" }}
                                onClick={() =>
                                  dispatch(addMovieToWatchlist(champion))
                                }
                              >
                                Add
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "#ffc400" }}
                                onClick={() =>
                                  dispatch(
                                    removeMovieFromWatchlist(champion.id)
                                  )
                                }
                              >
                                Remove
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <Avatar
                style={{
                  height: 50,
                  width: 50,
                  margin: "auto",
                  backgroundColor: "#47c2be",
                }}
                src={data.image_url}
                alt={data.image_url}
              />
              <h2>{data.name}</h2>
              <p>
                <b>Move Speed:</b> {data.movespeed}
                <br />
                <b>Armor:</b> {data.armor}
                <br />
                <b>Attack Range: </b>
                {data.attackrange}
                <br />
                <b>Armor Per Level:</b> {data.armorperlevel}
                <br />
                <b>Attack Damage:</b> {data.attackdamage}
              </p>
            </div>
          </Modal>
        </>

        <Pagination
          count={Number.parseInt((handleSearch()?.length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default TableComp;
