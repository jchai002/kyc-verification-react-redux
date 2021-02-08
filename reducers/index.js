import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as form } from "redux-form";
import signup from "./signupReducer";
import verification from "./verificationReducer";
import documents from "./documentsReducer";

const reducer = combineReducers({
  routing: routerReducer,
  form,
  signup,
  verification,
  documents
});

export default reducer;
