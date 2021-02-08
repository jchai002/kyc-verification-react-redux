import {
  VERIFICATION_RESET,
  VERIFICATION_PENDING,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL
} from "app/constants/ActionTypes";

export default function(state = { status: null, failCount: 0 }, action) {
  if (action.type === VERIFICATION_RESET) {
    return { ...state, status: VERIFICATION_RESET };
  }

  if (action.type === VERIFICATION_PENDING) {
    return { ...state, status: VERIFICATION_PENDING };
  }

  if (action.type === VERIFICATION_SUCCESS) {
    return { ...state, status: VERIFICATION_SUCCESS };
  }

  if (action.type === VERIFICATION_FAIL) {
    return { status: VERIFICATION_FAIL, failCount: state.failCount + 1 };
  }

  return state;
}
