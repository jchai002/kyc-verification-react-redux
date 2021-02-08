import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { submitSignup } from "app/actions/signup";
import { withRouter } from "react-router";
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  ALREADY_REGISTERED
} from "app/constants/ActionTypes";
import Footer from "app/components/Partials/Footer";
import Email from "./Email";
import EthAddress from "./EthAddress";
import Contribution from "./Contribution";
import Success from "./Success";
import Error from "./Error";
import TokenImg from "app/assets/images/token.svg";

const selector = formValueSelector("signup");

@connect(
  state => ({
    email: selector(state, "email"),
    ethAddress: selector(state, "ethAddress"),
    contributionAmount: selector(state, "contributionAmount"),
    signup: state.signup
  }),
  { submitSignup }
)
@withRouter
export default class SignUpFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      reset: false
    };
  }
  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  firstPage = () => {
    this.setState({ page: 1, reset: true });
  };

  handleSubmit = () => {
    const { email, ethAddress, contributionAmount } = this.props;
    this.props.submitSignup({ email, ethAddress, contributionAmount });
  };

  renderPage = () => {
    const { submitted, toRender } = this.props.signup;
    const { page, reset } = this.state;
    if (!reset && submitted && toRender === ALREADY_REGISTERED) {
      this.props.router.push("/already-registered");
    }
    if (!reset && submitted && toRender === SIGNUP_ERROR) {
      return <Error />;
    }
    if (!reset && submitted && toRender === SIGNUP_SUCCESS) {
      return <Success />;
    }
    switch (page) {
      case 1:
        return <Email onSubmit={this.nextPage} />;
      case 2:
        return (
          <EthAddress
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        );
      case 3:
        return (
          <Contribution
            previousPage={this.previousPage}
            onSubmit={this.handleSubmit}
          />
        );
    }
  };

  render() {
    return (
      <div className="signup page">
        <div className="form-content form-main">
          <div className="form-intro">
            <h1>Crowdsale Registration NOW OPEN</h1>
            <h2>Register today to get your STOW IT tokens.</h2>
            <h3>HOW DOES IT WORK?</h3>
            <img className="token" src={TokenImg} role="presentation" />
          </div>
          <div className="signup__steps">{this.renderPage()}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
