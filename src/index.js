import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import NavbarContextProvider from "./context/navbarContext";
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <NavbarContextProvider>
        <App />
      </NavbarContextProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
