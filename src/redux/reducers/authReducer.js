import { actionTypes } from "../actions/actionTypes";

const auth = localStorage.getItem("auth");

const initialState = auth
  ? { isLoggedIn: true, auth }
  : { isLoggedIn: false, auth: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  const {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} = actionTypes

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        auth: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        auth: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        auth: null,
      };
    default:
      return state;
  }
}