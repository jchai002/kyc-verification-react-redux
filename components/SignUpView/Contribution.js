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
export default class Contribution extends Component {
  render() {
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <StepsDisplay step={"contribution"} />
        <div className="form-details">
          <div className="form-info">
            <p>
              Please provide the estimated amount of ETH you expect to
              contribute to the crowdsale.
            </p>
            <span className="back" onClick={previousPage}>
              <i className="material-icons">arrow_back</i>Go Back
            </span>
          </div>
          <div className="input-group">
            <div className="input-group__inner">
              <Field name="contribution" component={error} />
              <Field
                name="contributionAmount"
                component="input"
                placeholder="Contribution Amount(ETH)"
                type="text"
                label="Contribution"
              />
              <button
                type="submit"
                disabled={pristine || submitting}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
