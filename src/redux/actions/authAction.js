import axios from "axios";
import { API_URL } from "../../utils/constant"
import { actionTypes } from "./actionTypes"

  // service login
  const authLogin = (email, password) => {
    return axios.post(API_URL + "auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("auth", response.data.access_token);
        }
        return response.data;
      });
  };
  // service logout 
  const authlogout = () => {
    localStorage.removeItem("auth");
  };
  

  // login action
  export const login = (email, password) => (dispatch) => {
    return authLogin(email, password).then(
      (data) => {
        console.log('Login Sucess', data)
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        console.log("failed login >>>>", error)
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        dispatch({
          type: actionTypes.LOGIN_FAIL,
        });
        dispatch({
          type: actionTypes.SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

  // logout action
  export const logout = () => (dispatch) => {
    authlogout();
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };