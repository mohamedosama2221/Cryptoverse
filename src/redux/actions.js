import { FETCH_STATE } from "./type";
import axios from "axios";
import { options } from "./../api/cryptoApi";

export const fetchMarketState = () => async (dispatch) => {
  const response = await axios.request(options("/coins"));
  const res = await response.data;
  console.log(res.data);
  dispatch({ type: FETCH_STATE, payload: res.data });
};
