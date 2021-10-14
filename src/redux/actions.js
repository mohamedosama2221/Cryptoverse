import { FETCH_STATE, FETCH_NEWS } from "./type";
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
