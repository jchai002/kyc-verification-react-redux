import {
  FACE_PHOTO_CAPTURED,
  DOC_PHOTO_CAPTURED,
  FACE_PHOTO_RESET,
  DOC_PHOTO_RESET,
  VERIFICATION_RESET
} from "app/constants/ActionTypes";

export default function(state = { facePhoto: "", docPhoto: "" }, action) {
  if (action.type === FACE_PHOTO_CAPTURED) {
    return { ...state, facePhoto: action.payload };
  }
  if (action.type === FACE_PHOTO_RESET) {
    return { ...state, facePhoto: "" };
  }
  if (action.type === DOC_PHOTO_CAPTURED) {
    return { ...state, docPhoto: action.payload };
  }
  if (action.type === DOC_PHOTO_RESET) {
    return { ...state, docPhoto: "" };
  }
  if (action.type === VERIFICATION_RESET) {
    return { ...state, facePhoto: "", docPhoto: "" };
  }
  return state;
}
