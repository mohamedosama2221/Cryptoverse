import {
  FETCH_STATE,
  FETCH_NEWS,
  FETCH_COIN_DETAILS,
  CLEAR_COIN,
  FETCH_COIN_CHART,
  FETCH_EXCHANGE,
} from "./type";
import { options } from "./../api/cryptoApi";
import { newsOption } from "./../api/newsApi";
import { fetchData } from "../api/utils";
import { exchangeOptions } from "../api/exchangeApi";

export const fetchMarketState = () => async (dispatch) => {
  const res = await fetchData(options("/coins"));

  dispatch({ type: FETCH_STATE, payload: res.data });
};

export const fetchMarketNews = (url) => async (dispatch) => {
  const res = await fetchData(newsOption(url, 100));

  dispatch({ type: FETCH_NEWS, payload: res.value });
};

export const fetchCoinDetails = (coinId) => async (dispatch) => {
  const res = await fetchData(options(`/coin/${coinId}`));

  dispatch({ type: FETCH_COIN_DETAILS, payload: res.data.coin });
};

export const fetchCoinChart = (coinId, timeperiod) => async (dispatch) => {
  const res = await fetchData(
    options(`/coin/${coinId}/history/?timePeriod=${timeperiod}`)
  );
  dispatch({ type: FETCH_COIN_CHART, payload: res.data });
};

export const fetchExchanges = () => async (dispatch) => {
  const res = await fetchData(exchangeOptions);
  console.log(res.data);
  dispatch({ type: FETCH_EXCHANGE, payload: res.data });
};

export const clearCoin = () => {
  return { type: CLEAR_COIN };
};
