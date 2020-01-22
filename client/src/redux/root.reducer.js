import { combineReducers } from "redux";
import shopReducer from "./shop/shop.reducer";
import errorReducer from "./errors/error.reducer";

const rootReducer = combineReducers({
  shop: shopReducer,
  error: errorReducer
});

export default rootReducer;
