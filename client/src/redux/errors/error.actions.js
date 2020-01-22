import { GET_ERROR, CLEAR_ERROR } from "./error.types";

export const getError = (msg, status, id = null) => {
  return {
    type: GET_ERROR,
    payload: { msg, status, id }
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};
