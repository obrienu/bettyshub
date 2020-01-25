import {
  GET_ITEMS,
  LOADING_ITEM,
  GET_CATEGORY,
  GET_SHOWPAGE
} from "./shop.types";

const initialState = {
  items: {},
  loading: false,
  category: [],
  showpage: {}
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.payload.fabric
        ? {
            ...state,
            loading: false,
            items: {
              ...state.items,
              fabric: {
                data: [...action.payload.fabric],
                totalItems: action.payload.totalItems
              }
            }
          }
        : {
            ...state,
            items: {
              ...state.items,
              accessories: {
                data: [...action.payload.accessories],
                totalItems: action.payload.totalItems
              }
            },
            loading: false
          };
    case LOADING_ITEM:
      return {
        ...state,
        loading: true
      };
    case GET_CATEGORY:
      return {
        ...state,
        loading: false,
        category: action.payload
      };
    case GET_SHOWPAGE:
      return {
        ...state,
        loading: false,
        showpage: action.payload
      };
    default:
      return state;
  }
};

export default shopReducer;
