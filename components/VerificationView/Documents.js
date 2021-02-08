import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { isMobile } from "react-device-detect";
import StepsDisplay from "./StepsDisplay";
import LiveVerify from "./LiveVerify";
import Upload from "./Upload";
import validate from "app/components/utils/validate";
import error from "app/components/utils/error";
import UploadImage from "app/assets/images/document_upload.svg";
import WebcamImage from "app/assets/images/webcam.svg";
import Shufti from "app/assets/images/shufti.jpg";

const UPLOADER = "UPLOADER";
const WEBCAM = "WEBCAM";

@reduxForm({
  form: "signup",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})
@connect(({ documents }) => ({ documents }), null)
export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: null
    };
  }

  renderBackButton = reset => {
    const { previousPage } = this.props;
    const onClick =
      !reset || isMobile ? previousPage : () => this.setState({ method: null });
    return (
      <span className="back" onClick={onClick}>
        <i className="material-icons">arrow_back</i>Go Back
      </span>
    );
  };

  renderUploader = () => {
    return (
      <div key="upload" className="verification__body">
        <div className="form-info form-info--full">
          <h2>Upload photos</h2>
          {this.renderBackButton(true)}
        </div>
        <p>
          Upload a photo of your official ID, such as a passport or state issued
          ID as well as a photo of yourself.
        </p>
        <div className="choices">
          <Upload type="doc" />
          <Upload type="face" />
        </div>
      </div>
    );
  };

  renderMethods = () => {
    return (
      <div key="methods" className="verification__body">
        <div className="form-info form-info--full">
          <h2>Choose Upload Method</h2>
          {this.renderBackButton()}
        </div>
        <p>
          Would you like to use our live video verification? Or do you prefer to
          upload your photos from your device?
        </p>
        <div className="choices">
          <div
            className="choice"
            onClick={() => this.setState({ method: WEBCAM })}
          >
            <img role="presentation" src={WebcamImage} />
            <p>Live Verification</p>
          </div>
          <div
            className="choice"
            onClick={() => this.setState({ method: UPLOADER })}
          >
            <img role="presentation" src={UploadImage} />
            <p>Upload Photos</p>
          </div>
        </div>
      </div>
    );
  };

  renderBody = () => {
    if (this.state.method === WEBCAM) {
      return (
        <LiveVerify
          resetMethod={() => this.setState({ method: null })}
          key="live"
        />
      );
    }
    const verifyButton =
      this.props.documents.facePhoto.length &&
      this.props.documents.docPhoto.length ? (
        <div className="actions" key="submit-verification">
          <button type="submit" className="btn btn-primary">
            Verify
          </button>
        </div>
      ) : null;
    if (isMobile || this.state.method === UPLOADER) {
      return [this.renderUploader(), verifyButton];
    }
    return this.renderMethods();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <StepsDisplay step={"documents"} />
        {this.renderBody()}
        <div className="shufti">
          <img role="presentation" src={Shufti} />
        </div>
      </form>
    );
  }
}
