import React, { Component } from "react";

export default class Error extends Component {
  render() {
    return (
      <div className="signup-error">
        <div className="form-info">
          <p>
            Something went wrong, please <a href="/">try again</a>.
          </p>
        </div>
      </div>
    );
  }
}
