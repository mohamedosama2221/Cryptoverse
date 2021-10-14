import { FETCH_NEWS } from "./../type";
const initState = {
  news: [],
};

export const newsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_NEWS:
      return {
        ...state,
        news: payload,
      };
    default:
      return state;
  }
};
