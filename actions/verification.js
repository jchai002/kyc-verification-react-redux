import axios from "axios";
import {
  VERIFICATION_RESET,
  VERIFICATION_PENDING,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  FACE_PHOTO_CAPTURED,
  FACE_PHOTO_RESET,
  DOC_PHOTO_CAPTURED,
  DOC_PHOTO_RESET
} from "app/constants/ActionTypes";
const api = axios.create({ baseURL: "/api" });

export function submitVerification(data) {
  return async dispatch => {
    dispatch({ type: VERIFICATION_PENDING });
    const {
      accessToken,
      method,
      country,
      firstName,
      lastName,
      phone,
      birthDay,
      birthMonth,
      birthYear,
      facePhoto,
      docPhoto
    } = data;
    var faceS3Res, docS3Res, res;

    try {
      faceS3Res = await api.post("/s3/upload", {
        method,
        country,
        firstName,
        lastName,
        phone,
        birthDay,
        birthMonth,
        birthYear,
        type: "face",
        base64: facePhoto
      });
    } catch (e) {
      return dispatch({ type: VERIFICATION_FAIL });
    }

    try {
      docS3Res = await api.post("/s3/upload", {
        method,
        country,
        firstName,
        lastName,
        phone,
        birthDay,
        birthMonth,
        birthYear,
        type: "doc",
        base64: docPhoto
      });
    } catch (e) {
      return dispatch({ type: VERIFICATION_FAIL });
    }

    const formattedData = {
      method,
      country,
      first_name: firstName,
      last_name: lastName,
      dob: `${birthYear}-${birthMonth}-${birthDay}`,
      reference: firstName + lastName + Date.now(),
      phone_number: `+${phone}`,
      face_image: facePhoto,
      document_image: docPhoto
    };
    const externalApi = axios.create({
      baseURL: process.env.kycBackendUrl + "/api",
      headers: { Authorization: accessToken }
    });
    try {
      await externalApi.post("/doc", {
        data: formattedData,
        doc: { url: docS3Res.data, type: method }
      });

      res = await pollVerificationStatus(externalApi);
    } catch (e) {
      return dispatch({ type: VERIFICATION_FAIL });
    }

    const { kycVerified } = res.data;
    kycVerified
      ? dispatch({ type: VERIFICATION_SUCCESS })
      : dispatch({ type: VERIFICATION_FAIL });
  };
}

function pollVerificationStatus(externalApi) {
  return new Promise(async function poll(resolve) {
    const res = await externalApi.get("/user");
    // console.log(res);
    const { kycPending } = res.data;
    if (kycPending) {
      setTimeout(poll.bind(null, resolve), 1000);
    } else {
      resolve(res);
    }
  });
}

export function storeFacePhoto(base64) {
  return async dispatch => {
    dispatch({ type: FACE_PHOTO_CAPTURED, payload: base64 });
  };
}

export function resetFacePhoto() {
  return async dispatch => {
    dispatch({ type: FACE_PHOTO_RESET });
  };
}

export function storeDocPhoto(base64) {
  return async dispatch => {
    dispatch({ type: DOC_PHOTO_CAPTURED, payload: base64 });
  };
}

export function resetDocPhoto() {
  return async dispatch => {
    dispatch({ type: DOC_PHOTO_RESET });
  };
}

export function resetVerificationStatus() {
  return async dispatch => {
    dispatch({ type: VERIFICATION_RESET });
  };
}
