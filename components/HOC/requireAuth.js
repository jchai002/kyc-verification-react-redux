import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

export default function(ComposedComponent) {
  @withRouter
  class Authorized extends Component {
    componentWillMount() {
      const { accessToken } = this.props.location.query
        ? this.props.location.query
        : null;
      if (!accessToken) {
        this.props.router.push("/unauthorized");
      }
      const api = axios.create({
        baseURL: process.env.kycBackendUrl,
        headers: { Authorization: accessToken }
      });
      api
        .get("/api/user")
        .then(user => {
          if (user.data.kycAttempts >= 3) {
            this.props.router.push("/too-many-attempts");
          }
          if (user.data.kycVerified) {
            this.props.router.push("/already-verified");
          }
        })
        .catch(error => {
          if (error) {
            this.props.router.push("/unauthorized");
          }
        });
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Authorized;
}
