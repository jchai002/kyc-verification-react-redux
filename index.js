import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";

// Layouts
import App from "App";
import VerificationView from "app/components/VerificationView";
import SignUpView from "app/components/SignUpView";

import requireAuth from "app/components/HOC/requireAuth";
import AlreadyRegistered from "app/components/SpecialScreens/AlreadyRegistered";
import AlreadyVerified from "app/components/SpecialScreens/AlreadyVerified";
import TooManyAttempts from "app/components/SpecialScreens/TooManyAttempts";
import Unauthorized from "app/components/SpecialScreens/Unavailable";
import Unavailable from "app/components/SpecialScreens/Unauthorized";

// Redux Store
import store from "store";

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SignUpView} />
        <Route path="/verify" component={requireAuth(VerificationView)} />
        <Route path="/already-registered" component={AlreadyRegistered} />
        <Route path="/already-verified" component={AlreadyVerified} />
        <Route path="/too-many-attempts" component={TooManyAttempts} />
        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/*" component={SignUpView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
