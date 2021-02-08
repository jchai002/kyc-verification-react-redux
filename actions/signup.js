import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  ALREADY_REGISTERED,
  TOKEN_RESET
} from "app/constants/ActionTypes";
import axios from "axios";
const api = axios.create({ baseURL: process.env.kycBackendUrl });

export function submitSignup(data) {
  return async dispatch => {
    var res, conflictError;
    try {
      res = await api.post("/api/user", data);
    } catch (e) {
      if (e.response.status === 409) {
        conflictError = e.response.data.error;
      } else {
        return dispatch({ type: SIGNUP_ERROR });
      }
    }

    conflictError
      ? dispatch({ type: ALREADY_REGISTERED, conflictError })
      : dispatch({ type: SIGNUP_SUCCESS });
  };
}

export function submitResend(email) {
  return async dispatch => {
    const res = await api.post("/api/user/resettoken", { email });
    if (res.data.success) {
      dispatch({ type: TOKEN_RESET });
    }
  };
}
