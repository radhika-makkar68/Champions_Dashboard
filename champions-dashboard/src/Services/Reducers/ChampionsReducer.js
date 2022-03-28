import {
  GET_CHAMPIONS_REQUEST,
  GET_CHAMPIONS_FAIL,
  GET_CHAMPIONS_SUCCESS,
} from "../constants";

const initialState = {
  champions: [],
};

export default function ChampionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAMPIONS_REQUEST:
      return {
        loading: true,
      };
    case GET_CHAMPIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        champions: action.payload,
      };
    case GET_CHAMPIONS_FAIL:
      return {
        loading: true,
      };
    default:
      return state;
  }
}
