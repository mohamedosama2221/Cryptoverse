import { FETCH_STATE, FETCH_COIN_DETAILS, CLEAR_COIN } from "./../type";
const initState = {
  MarketState: {
    total24hVolume: "",
    totalCoins: "",
    totalExchanges: "",
    totalMarketCap: "",
    totalMarkets: "",
  },
  coins: [],
  singleCoin: [],
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
    case FETCH_COIN_DETAILS:
      return {
        ...state,
        singleCoin: [payload],
      };
    case CLEAR_COIN:
      return {
        ...state,
        singleCoin: [],
      };
    default:
      return state;
  }
};
