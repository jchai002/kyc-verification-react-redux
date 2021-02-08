import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { Field, reduxForm } from "redux-form";
import { submitResend } from "app/actions/signup";
import error from "app/components/utils/error";
import validate from "app/components/utils/validate";
import Footer from "app/components/Partials/Footer";
const selector = formValueSelector("signup");

@reduxForm({
  form: "signup",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})
@connect(
  state => ({
    email: selector(state, "email"),
    signup: state.signup
  }),
  { submitResend }
)
export default class AlreadyRegistered extends Component {
  renderPage() {
    if (this.props.signup.tokenReset) {
      return (
        <div className="check-mail">
          <p>
            If an account with this email exists, you should receive an email
            shortly.
          </p>
        </div>
      );
    }
    return (
      <form>
        <div className="form-info form-info--full">
          <p>
            So what happens now? You should soon receive an email with the next
            steps to complete your KYC registration.{" "}
          </p>
          <p>
            Haven’t received your email? Enter your email below to request
            another.
          </p>
        </div>
        <div className="input-group--full">
          <Field name="email" component={error} />
          <Field
            name="email"
            type="email"
            placeholder="Your Email Address"
            component="input"
            label="Email"
          />
          <div
            className="btn btn-primary"
            onClick={() => this.props.submitResend(this.props.email)}
          >
            Request
          </div>
        </div>
      </form>
    );
  }
  render() {
    var header = "Already registered for the ICO?";
    if (this.props.signup.conflictError === "email must be unique") {
      header = "This email has already been registered";
    }
    if (this.props.signup.conflictError === "ethAddress must be unique") {
      header = "This eth address is associated with another account";
    }
    return (
      <div className="page">
        <div className="form-content form-main">
          <div className="form-intro form-intro--already-registered">
            <h1>{header}</h1>
            <a className="back" href="/">
              <i className="material-icons">arrow_back</i>Back to registration
            </a>
          </div>
          <div className="signup__steps">{this.renderPage()}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
