export const options = (url) => {
  return {
    method: "GET",
    url: `https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2${url}`,
    headers: {
      "x-access-token":
        "coinranking01ba297b751e2fef708b7f3722eb16996ce67a4a5fc44057",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
};
