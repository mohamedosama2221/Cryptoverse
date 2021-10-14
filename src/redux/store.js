import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cryptoReducer } from "./reducers/cryptoReducer";
import { newsReducer } from "./reducers/newsReducer";
import { combineReducers } from "redux";
const reducers = combineReducers({
  cryptoReducer,
  newsReducer,
});
const compose = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(reducers, compose);
