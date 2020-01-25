import { GET_ITEMS, LOADING_ITEM, GET_SHOWPAGE } from "./shop.types";
import axios from "axios";
import { getError } from "../errors/error.actions";

export const getItems = shop => dispatch => {
  dispatch({
    type: LOADING_ITEM
  });

  axios
    .get(`/api/${shop}`)
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err => getError(err.response.data.msg, err.response.status));
};

export const getShowpage = (shop, id) => dispatch => {
  dispatch({
    type: LOADING_ITEM
  });

  axios
    .get(`/api/${shop}/${id}`)
    .then(res =>
      dispatch({
        type: GET_SHOWPAGE,
        payload: res.data
      })
    )
    .catch(err => getError(err.response.data.msg, err.response.status));
};

/* export const getCategory = shop => dispatch => {
  dispatch({
    type: LOADING_ITEM
  });
  axios
    .get(`/api/${shop}/category`)
    .then(res =>
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      })
    )
    .catch(err => getError(err.response.data.msg, err.response.status));
}; */

/* export const getFilteredItems = (shop, category) => dispatch => {
  dispatch({
    type: LOADING_ITEM
  });

  axios
    .get(`/api/${shop}/category/${category}`)
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err => getError(err.response.data.msg, err.response.status));
};
 */
