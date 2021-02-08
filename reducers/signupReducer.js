import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  ALREADY_REGISTERED,
  TOKEN_RESET
} from "app/constants/ActionTypes";

export default function(
  state = {
    submitted: false,
    toRender: null,
    tokenReset: false,
    conflictError: null
  },
  action
) {
  if (action.type === SIGNUP_SUCCESS) {
    return { ...state, submitted: true, toRender: SIGNUP_SUCCESS };
  }

  if (action.type === SIGNUP_ERROR) {
    return { ...state, submitted: true, toRender: SIGNUP_ERROR };
  }

  if (action.type === ALREADY_REGISTERED) {
    return {
      ...state,
      submitted: true,
      toRender: ALREADY_REGISTERED,
      conflictError: action.conflictError
    };
  }

  if (action.type === TOKEN_RESET) {
    return { ...state, submitted: true, tokenReset: true };
  }

  return state;
}
