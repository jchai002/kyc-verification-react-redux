import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import StepsDisplay from "./StepsDisplay";
import validate from "app/components/utils/validate";
import error from "app/components/utils/error";

@reduxForm({
  form: "signup",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})
export default class Email extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <StepsDisplay step={"email"} />
        <div className="form-details">
          <div className="form-info">
            <p>
              For security purposes, you must use the same email address
              throughout the crowdsale. A link to complete crowdsale
              registration will be sent to this address.
            </p>
          </div>
          <div className="input-group">
            <div className="input-group__inner">
              <Field name="email" component={error} />
              <Field
                name="email"
                type="email"
                placeholder="Your Email Address"
                component="input"
                label="Email"
              />
              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
