import RootReducer from "./Reducers/index";
import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const Store = createStore(
  RootReducer,
  loadFromLocalStorage(),
  composeEnhancer(applyMiddleware(thunk))
);

Store.subscribe(() => saveToLocalStorage(Store.getState()));

export default Store;
