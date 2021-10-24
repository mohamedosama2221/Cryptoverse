export const options = (url) => {
  return {
    method: "GET",
    url: `https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2${url}`,
    headers: {
      "x-access-token": process.env.REACT_APP_CRYPTO_API,
      "X-Requested-With": "XMLHttpRequest",
    },
  };
};
