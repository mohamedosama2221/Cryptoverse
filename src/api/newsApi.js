export const newsOption = (newsCategory, count) => {
  return {
    method: "GET",
    url: `https://bing-news-search1.p.rapidapi.com//news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "7ce643c3famsh5f42bf67136da03p150c0bjsn398d327cbb94",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
};
