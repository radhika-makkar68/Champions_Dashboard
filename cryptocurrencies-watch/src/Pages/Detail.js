import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { makeStyles } from "@mui/styles";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
    paddingBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
}));

function Detail() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  let desc = coin && coin.description.en.split(". ")[0];
  let desc1 = `${desc}`;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!coin) return <LinearProgress style={{ backgroundColor: "#47c2be" }} />;

  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(desc1)}.
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Market Capital:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
}

export default Detail;
