import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import {
  submitVerification,
  resetVerificationStatus
} from "app/actions/verification";
import {
  VERIFICATION_PENDING,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL
} from "app/constants/ActionTypes";
import Footer from "app/components/Partials/Footer";
import Info from "./Info";
import Documents from "./Documents";
import Finish from "./Finish";
import StepsDisplay from "./StepsDisplay";
import SpinnerImg from "app/assets/images/spinner.gif";
import ErrorImage from "app/assets/images/error.svg";
import Checkmark from "app/assets/images/checkmark.svg";

const selector = formValueSelector("verification");

@connect(
  state => ({
    method: selector(state, "method"),
    country: selector(state, "country"),
    firstName: selector(state, "firstName"),
    lastName: selector(state, "lastName"),
    phone: selector(state, "phone"),
    birthDay: selector(state, "birthDay"),
    birthMonth: selector(state, "birthMonth"),
    birthYear: selector(state, "birthYear"),
    verification: state.verification,
    documents: state.documents
  }),
  { submitVerification, resetVerificationStatus }
)
export default class SignUpFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      accessToken: null
    };
  }

  componentDidMount() {
    const { accessToken } = this.props.location.query
      ? this.props.location.query
      : null;
    this.setState({ accessToken });
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  handleSubmit = () => {
    const {
      method,
      country,
      firstName,
      lastName,
      phone,
      birthDay,
      birthMonth,
      birthYear
    } = this.props;
    const { facePhoto, docPhoto } = this.props.documents;
    const { accessToken } = this.state;
    this.props.submitVerification({
      accessToken,
      method,
      country,
      firstName,
      lastName,
      phone,
      birthDay,
      birthMonth,
      birthYear,
      facePhoto,
      docPhoto
    });
  };

  renderPageIntro = () => {
    const { status, failCount } = this.props.verification;
    if (status === VERIFICATION_FAIL && failCount >= 3) {
      return (
        <div className="form-intro unable-to-register">
          <h1>
            <img role="presentation" src={ErrorImage} />
            <span>Unable to complete registration</span>
          </h1>
          <p>
            It seems that we are unable to verify your identity. We give all
            users three opportunities to upload documents and comple KYC
            registration.
          </p>
          <p>
            If you feel this is a mistake, please <a href="mailto:info@stowittoken.com">contact us</a> and
            we can try to work with you.
          </p>
        </div>
      );
    } else {
      return (
        <div className="form-intro form-intro--verification">
          <h1>Finish KYC Registration</h1>
          <p>
            Verifying your official identification is required for crowdsale
            participation. Need help? Refer to our <a href="https://stowittoken.com/how-it-works" target="_blank">How To Guide</a>.
          </p>
        </div>
      );
    }
  };

  renderPage = () => {
    const { status, failCount } = this.props.verification;
    const { page } = this.state;
    if (status === VERIFICATION_PENDING) {
      return (
        <div className="verification__pending">
          <StepsDisplay step={"documents"} />
          <div className="form-info form-info--full">
            <h2>Verifying...</h2>
            <img role="presentation" src={SpinnerImg} className="spinner" />
            <p class="verify-message">
              This process may take up to 2 minutes. <br />
              Please do not close this screen or go back
            </p>
          </div>
        </div>
      );
    }
    if (status === VERIFICATION_SUCCESS) {
      return (
        <div className="verification__success">
          <StepsDisplay step={"verified"} />
          <div className="form-info form-info--full">
            <h2>
              {" "}
              <img role="presentation" src={Checkmark} className="checkmark" />
              <span>KYC Verification Completed</span>
            </h2>
            <p>
              Congratulations! Your identity has been verified successfully and
              you can participate in the upcoming STOW IT Token Crowdsale
              scheduled for April.
            </p>
            <p>
              The morning of the crowdsale we will send you an email from the
              address: <a href="mailto:info@stowittoken.com">info@stowittoken.com</a>, with a unique link.
              You will use this link to contribute to the crowdsale.{" "}
              <b>Do not share this link with others.</b>{" "}
            </p>
            <p>
              If you do not receive the email or have additional questions,
              please <a href="mailto:info@stowittoken.com">contact us</a>.
            </p>
          </div>
        </div>
      );
    }
    if (status === VERIFICATION_FAIL) {
      if (failCount > 0 && failCount < 3) {
        return (
          <div className="verification__error">
            <StepsDisplay step={"error"} />
            <div className="form-info form-info--full">
              <h2>
                <img role="presentation" src={ErrorImage} />
                <span>Unable to verify identity</span>
              </h2>
              <p>
                Looks like we were unable to verify your identity with the
                photos that you have uploaded. Don’t worry this happens
                sometimes. You can try uploading new photos of yourself and your
                ID. <a href="https://stowittoken.com/how-it-works" target="_blank">Click here</a> for more information.
              </p>
            </div>
            <div className="actions">
              <div
                className="btn btn-primary"
                onClick={() => {
                  this.props.resetVerificationStatus();
                  this.setState({ page: 1 });
                }}
              >
                Try Again
              </div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    }
    switch (page) {
      case 1:
        return <Info onSubmit={this.nextPage} />;
      case 2:
        return (
          <Documents
            previousPage={this.previousPage}
            onSubmit={this.handleSubmit}
          />
        );
    }
  };

  render() {
    return (
      <div className="verification page">
        <div className="form-content form-main">
          {this.renderPageIntro()}
          <div className="verification__steps">{this.renderPage()}</div>
        </div>
        <Footer isVerifyPage={true} />
      </div>
    );
  }
}
