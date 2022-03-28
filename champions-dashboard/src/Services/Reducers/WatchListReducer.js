import {
  ADD_MOVIE_TO_WATCHLIST,
  REMOVE_MOVIE_FROM_WATCHLIST,
} from "../constants";

const initialState = {
  watchlist: [],
};

export default function WatchListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE_TO_WATCHLIST:
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };
    case REMOVE_MOVIE_FROM_WATCHLIST:
      const updatedWatchList = state.watchlist.filter(
        (x) => x.id !== action.payload
      );
      return {
        ...state,
        watchlist: updatedWatchList,
      };
    default:
      return state;
  }
}
