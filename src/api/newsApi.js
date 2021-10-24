export const newsOption = (newsCategory, count) => {
  return {
    method: "GET",
    url: `https://bing-news-search1.p.rapidapi.com//news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API,
      "X-Requested-With": "XMLHttpRequest",
    },
  };
};
