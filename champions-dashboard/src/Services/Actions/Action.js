import {
  GET_CHAMPIONS_FAIL,
  GET_CHAMPIONS_SUCCESS,
  GET_CHAMPIONS_REQUEST,
  ADD_MOVIE_TO_WATCHLIST,
  REMOVE_MOVIE_FROM_WATCHLIST,
} from "../constants";
import axios from "axios";

export const GetChampions = (sort) => async (dispatch) => {
  dispatch({ type: GET_CHAMPIONS_REQUEST });
  try {
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    let response = await axios.get(
      `https://api.pandascore.co/lol/champions?sort=${sort}&page[number]=2&token=AxlvuDdsUE8Iz37-b5_7_Hq0yWxfakep4jaHK3-CSSWMh6HTHyE`,
      {
        headers: {
          origin: "*",
        },
      }
    );
    dispatch({ type: GET_CHAMPIONS_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_CHAMPIONS_FAIL, payload: err });
  }
};

export const addMovieToWatchlist = (champion) => async (dispatch) => {
  dispatch({ type: ADD_MOVIE_TO_WATCHLIST, payload: champion });
};

export const removeMovieFromWatchlist = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_MOVIE_FROM_WATCHLIST, payload: id });
};
