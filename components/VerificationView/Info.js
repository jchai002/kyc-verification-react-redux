import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import StepsDisplay from "./StepsDisplay";
import validate from "app/components/utils/validate";
import error from "app/components/utils/error";
import countries from "app/constants/countries";
import months from "app/constants/months";

@reduxForm({
  form: "verification",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})
export default class Info extends Component {
  getYears = () => {
    var years = [];
    for (var i = 1930; i <= 2000; i++) {
      years.push(i);
    }
    return years.map(year => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <StepsDisplay step={"info"} />
        <div className="form-info form-info--full">
          <h2>Add Personal Information</h2>
          <p>
            Fill out the following information to verify against your
            documentation that you will upload in the next step.
          </p>
        </div>
        <div className="input-row">
          <div className="input-group select-group method">
            <label>What type of ID will you be uploading?</label>
            <Field name="method" component={error} />
            <Field name="method" component="select" className="input--short">
              <option value="">Please Select</option>
              <option value="passport">Passport</option>
              <option value="driving_license">Driver's License</option>
              <option value="id_card">Government ID Card</option>
            </Field>
          </div>
          <div className="input-group select-group country">
            <label>Country</label>
            <Field name="country" component={error} />
            <Field name="country" component="select" className="input--short">
              <option value="">Please Select</option>
              {countries.map(country => (
                <option key={country[0]} value={country[1]}>
                  {country[0]}
                </option>
              ))}
            </Field>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group first-name">
            <label>First Name</label>
            <Field name="firstName" component={error} />
            <Field
              name="firstName"
              type="text"
              component="input"
              className="input--short"
            />
          </div>
          <div className="input-group last-name">
            <label>Last Name</label>
            <Field name="lastName" component={error} />
            <Field
              name="lastName"
              type="text"
              component="input"
              className="input--short"
            />
          </div>
          <div className="input-group phone">
            <label>Phone Number (+440000000000)</label>
            <Field name="phone" component={error} />
            <Field
              name="phone"
              type="text"
              component="input"
              className="input--short"
            />
          </div>
        </div>
        <div className="input-row flex-space-between">
          <div className="input-group select-group birth-day">
            <label>Birth Day</label>
            <Field name="birthDay" component={error} />
            <Field name="birthDay" component="select" className="input--short">
              <option value="">Please Select</option>
              {[...Array(31).keys()].map(day => {
                var dayString = (day + 1).toString();
                if (dayString.length < 2) {
                  dayString = "0" + dayString;
                }
                return (
                  <option key={dayString} value={dayString}>
                    {dayString}
                  </option>
                );
              })}
            </Field>
          </div>
          <div className="input-group select-group birth-month">
            <label>Birth Month</label>
            <Field name="birthMonth" component={error} />
            <Field
              name="birthMonth"
              component="select"
              className="input--short"
            >
              <option value="">Please Select</option>
              {months.map((month, i) => {
                var monthString = (i + 1).toString();
                if (monthString.length < 2) {
                  monthString = "0" + monthString;
                }
                return (
                  <option key={monthString} value={monthString}>
                    {month}
                  </option>
                );
              })}
            </Field>
          </div>
          <div className="input-group select-group birth-year">
            <label>Birth Year</label>
            <Field name="birthYear" component={error} />
            <Field name="birthYear" component="select" className="input--short">
              <option value="">Please Select</option>
              {this.getYears()}
            </Field>
          </div>
        </div>
        <div className="input-row">
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    );
  }
}
