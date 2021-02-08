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
export default class EthAddress extends Component {
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <StepsDisplay step={"eth"} />
        <div className="form-details">
          <div className="form-info">
            <p>
              You must use the same ETH Address throughout the crowdsale. Do not
              use an exchange wallet. We recommend using My Ether Wallet.
            </p>
            <span className="back" onClick={previousPage}>
              <i className="material-icons">arrow_back</i>Go Back
            </span>
          </div>
          <div className="input-group">
            <div className="input-group__inner">
              <Field name="ethAddress" component={error} />
              <Field
                name="ethAddress"
                component="input"
                placeholder="Your ETH Address"
                type="text"
                label="Eth Address"
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
