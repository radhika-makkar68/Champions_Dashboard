import { combineReducers } from "redux";
import ChampionsReducer from "./ChampionsReducer";
import WatchListReducer from "./WatchListReducer";

export default combineReducers({
  ChampionsReducer,
  WatchListReducer,
});
