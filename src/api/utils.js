import axios from "axios";

export const fetchData = async (option) => {
  const response = await axios.request(option);
  const res = await response.data;
  return res;
};
