import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  CryptoDetails,
  Homepage,
  Exchanges,
  Cryptocurrencies,
  News,
} from "./components";
import "./App.css";
import { navbarContext } from "./context/navbarContext";
const App = () => {
  const [selectedIndex, setSelectedIndex] = useState("0");
  const values = {
    selectedIndex,
    setSelectedIndex,
  };
  return (
    <navbarContext.Provider value={values}>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route exact path="/exchanges">
                  <Exchanges />
                </Route>
                <Route exact path="/cryptocurrencies">
                  <Cryptocurrencies />
                </Route>
                <Route
                  path="/crypto/:coinId"
                  children={<CryptoDetails />}
                ></Route>
                <Route exact path="/news">
                  <News />
                </Route>
              </Switch>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Copyright &copy; {new Date().getFullYear()}
              <Link
                to="/"
                onClick={() => {
                  setSelectedIndex("0");
                }}
              >
                Cryptoverse Inc.
              </Link>
              <br />
              All Rights Reserved.
            </Typography.Title>
            <Space>
              <Link
                to="/"
                onClick={() => {
                  setSelectedIndex("0");
                }}
              >
                Home
              </Link>
              <Link
                to="/exchanges"
                onClick={() => {
                  setSelectedIndex("2");
                }}
              >
                Exchanges
              </Link>
              <Link
                to="/news"
                onClick={() => {
                  setSelectedIndex("3");
                }}
              >
                News
              </Link>
            </Space>
          </div>
        </div>
      </div>
    </navbarContext.Provider>
  );
};

export default App;
