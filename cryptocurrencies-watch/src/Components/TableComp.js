import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
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
  CircularProgress,
  Pagination,
  Paper,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
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
      color: "#47c2be",
    },
  },
  sticky: {
    position: "sticky",
    left: 0,
    background: "#16171a",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
}));

function TableComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    currency,
    symbol,
    currencies,
    loading,
    fetchCoins,
    setOpenLogin,
    user,
  } = CryptoState();

  const classes = useStyles();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleSearch = () => {
    return currencies.filter(
      (currency) =>
        currency.symbol.toLowerCase().includes(search) ||
        currency.symbol.toUpperCase().includes(search)
    );
  };

  const handleCoinClick = (row) => {
    if (user) {
      navigate(`/coins/${row.id}`);
    } else {
      setOpenLogin(true);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          CryptoCurrency Prices with Market Capital
        </Typography>
        <TextField
          style={{ marginBottom: 20, width: "100%" }}
          label="Search for a Cryptocurrency"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
        <>
          {loading ? (
            <CircularProgress style={{ color: "#47c2be" }} />
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#47c2be" }}>
                  <TableRow>
                    {[
                      "CurrencyName",
                      "Price",
                      "24h Change",
                      "Market Capital",
                    ].map((el) => (
                      <TableCell
                        style={{
                          color: "white",
                          fontWeight: 600,
                          fontFamily: "Montserrat",
                          backgroundColor: "#47c2be",
                        }}
                        key={el}
                        className={el === "CurrencyName" ? classes.sticky : ""}
                        align={el === "CurrencyName" ? "left" : "right"}
                      >
                        {el}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((currency) => {
                      const profit = currency.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => handleCoinClick(currency)}
                          className={classes.row}
                          key={currency.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                            className={currency.name ? classes.sticky : ""}
                          >
                            <img
                              src={currency?.image}
                              alt={currency.name}
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
                              >
                                {currency.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {currency.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol} {numberWithCommas(currency.current_price)}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontWeight: 500,
                              color: profit ? "rgba(14,203,129)" : "red",
                            }}
                          >
                            {profit && "+"}
                            {currency.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              currency.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
        {!loading && (
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
        )}
      </Container>
    </ThemeProvider>
  );
}

export default TableComp;
