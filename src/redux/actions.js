import {
  FETCH_STATE,
  FETCH_NEWS,
  FETCH_COIN_DETAILS,
  CLEAR_COIN,
  FETCH_COIN_CHART,
  FETCH_EXCHANGE,
} from "./type";
import { newsOption } from "./../api/newsApi";
import { fetchData } from "../api/utils";
import axios from "axios";

export const fetchMarketState = () => async (dispatch) => {
  const res = await axios.get("https://crypto-api-693.herokuapp.com/api", {
    params: { url: "coins" },
  });
  dispatch({ type: FETCH_STATE, payload: res.data });
};

export const fetchMarketNews = (url) => async (dispatch) => {
  const res = await fetchData(newsOption(url, 100));

  dispatch({ type: FETCH_NEWS, payload: res.value });
};

export const fetchCoinDetails = (coinId) => async (dispatch) => {
  const res = await axios.get(
    `https://crypto-api-693.herokuapp.com/api/coin/${coinId}`
  );

  dispatch({ type: FETCH_COIN_DETAILS, payload: res.data.coin });
};

export const fetchCoinChart = (coinId, timeperiod) => async (dispatch) => {
  const res = await axios.get(
    `https://crypto-api-693.herokuapp.com/api/coin/${coinId}/history?timeperiod=${timeperiod}`
  );
  dispatch({ type: FETCH_COIN_CHART, payload: res.data });
};

export const fetchExchanges = () => async (dispatch) => {
  const res = await axios.get(
    "https://crypto-api-693.herokuapp.com/api/exchange"
  );
  dispatch({ type: FETCH_EXCHANGE, payload: res.data });
};

export const clearCoin = () => {
  return { type: CLEAR_COIN };
};
