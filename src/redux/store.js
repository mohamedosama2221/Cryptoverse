import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { mainReducer } from "./reducer";

const compose = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(mainReducer, compose);
