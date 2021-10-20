import {
  FETCH_STATE,
  FETCH_NEWS,
  FETCH_COIN_DETAILS,
  CLEAR_COIN,
  FETCH_COIN_CHART,
} from "./type";
import axios from "axios";
import { options } from "./../api/cryptoApi";
import { newsOption } from "./../api/newsApi";

export const fetchMarketState = () => async (dispatch) => {
  const response = await axios.request(options("/coins"));
  const res = await response.data;
  dispatch({ type: FETCH_STATE, payload: res.data });
};

export const fetchMarketNews = (url) => async (dispatch) => {
  const response = await axios.request(newsOption(url, 100));
  const res = await response.data;
  dispatch({ type: FETCH_NEWS, payload: res.value });
};

export const fetchCoinDetails = (coinId) => async (dispatch) => {
  const response = await axios.request(options(`/coin/${coinId}`));
  const res = await response.data;
  dispatch({ type: FETCH_COIN_DETAILS, payload: res.data.coin });
};

export const fetchCoinChart = (coinId, timeperiod) => async (dispatch) => {
  const response = await axios.request(
    options(`/coin/${coinId}/history/?timePeriod=${timeperiod}`)
  );
  const res = await response.data;
  dispatch({ type: FETCH_COIN_CHART, payload: res.data });
};

export const clearCoin = () => {
  return { type: CLEAR_COIN };
};
