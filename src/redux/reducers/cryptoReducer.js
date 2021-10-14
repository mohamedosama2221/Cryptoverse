import { FETCH_STATE } from "./../type";
const initState = {
  MarketState: {
    total24hVolume: "",
    totalCoins: "",
    totalExchanges: "",
    totalMarketCap: "",
    totalMarkets: "",
  },
  coins: [],
};

export const cryptoReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_STATE:
      const {
        total24hVolume,
        totalExchanges,
        totalCoins,
        totalMarketCap,
        totalMarkets,
      } = payload.stats;
      return {
        ...state,
        MarketState: {
          total24hVolume: total24hVolume,
          totalCoins: totalCoins,
          totalExchanges: totalExchanges,
          totalMarketCap: totalMarketCap,
          totalMarkets: totalMarkets,
        },
        coins: payload.coins,
      };
    default:
      return state;
  }
};
