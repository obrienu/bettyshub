import { GET_ERROR, CLEAR_ERROR } from "./error.types";

const INITIAL_STATE = {
  msg: "",
  status: null,
  id: ""
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ERROR:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERROR:
      return {
        msg: "",
        status: null,
        id: ""
      };
    default:
      return state;
  }
};

export default errorReducer;
