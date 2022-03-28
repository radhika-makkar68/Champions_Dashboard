import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { removeMovieFromWatchlist } from "../Services/Actions/Action";

export default function Detail() {
  const watchlist = useSelector((state) => state.WatchListReducer.watchlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState(watchlist);

  const removeFromWatchList = (id) => {
    dispatch(removeMovieFromWatchlist(id));
  };

  useEffect(() => {
    if (watchlist.length == 0) {
      navigate("/");
    }
  }, [watchlist.length]);

  useEffect(() => {
    setList(watchlist);
  }, [watchlist.length]);

  return (
    <div className="container">
      <div className="row">
        {list &&
          list.map((item) => (
            <Card
              className="col-sm-12 col-md-6"
              style={{
                backgroundColor: "#0f0f0f",
                color: "white",
                border: "1px solid #ffc400",
              }}
            >
              <CardContent>
                <Avatar
                  style={{
                    height: 100,
                    width: 100,
                    marginLeft: 15,
                    cursor: "pointer",
                    backgroundColor: "#47c2be",
                  }}
                  src={item.image_url}
                  alt={item.name}
                />
                <h1>{item.name}</h1>
                <p>
                  <b>Move Speed:</b> {item.movespeed}
                  <br />
                  <b>Armor:</b> {item.armor}
                  <br />
                  <b>Attack Range: </b>
                  {item.attackrange}
                  <br />
                  <b>Armor Per Level:</b> {item.armorperlevel}
                  <br />
                  <b>Attack Damage:</b> {item.attackdamage}
                </p>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ffc400",
                    margin: "10px",
                  }}
                  onClick={() => removeFromWatchList(item.id)}
                >
                  Remove From WatchList
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#ffc400",
          margin: "10px",
        }}
        onClick={() => navigate("/")}
      >
        Go back to Home Page
      </Button>
    </div>
  );
}
