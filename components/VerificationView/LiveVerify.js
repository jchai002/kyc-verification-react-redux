import React, { Component } from "react";
import {
  storeFacePhoto,
  storeDocPhoto,
  resetFacePhoto,
  resetDocPhoto
} from "app/actions/verification";
import { connect } from "react-redux";
import Webcam from "react-webcam";

@connect(({ documents }) => ({ documents }), {
  storeFacePhoto,
  storeDocPhoto,
  resetFacePhoto,
  resetDocPhoto
})
export default class LiveVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  setFaceWebcamRef = webcam => {
    this.faceWebcam = webcam;
  };

  setDocWebcamRef = webcam => {
    this.docWebcam = webcam;
  };

  captureFacePhoto = () => {
    const facePhoto = this.faceWebcam.getScreenshot();
    this.props.storeFacePhoto(facePhoto);
  };

  captureDocPhoto = () => {
    const docPhoto = this.docWebcam.getScreenshot();
    this.props.storeDocPhoto(docPhoto);
  };

  renderFaceWebcam = () => {
    const button1 = this.props.documents.facePhoto.length ? (
      <div className="btn btn-primary" onClick={this.props.resetFacePhoto}>
        Re-take
      </div>
    ) : (
      <div className="btn btn-primary" onClick={this.captureFacePhoto}>
        Capture
      </div>
    );
    const button2 = this.props.documents.facePhoto.length ? (
      <div
        className="btn btn-primary"
        onClick={() => this.setState({ step: this.state.step + 1 })}
      >
        Next
      </div>
    ) : null;
    const frame = this.props.documents.facePhoto.length ? (
      <div className="preview">
        <img src={this.props.documents.facePhoto} />
      </div>
    ) : (
      <Webcam
        audio={false}
        ref={this.setFaceWebcamRef}
        screenshotFormat="image/png"
      />
    );
    return (
      <div className="live-verify">
        <div className="form-info form-info--full">
          <h2>Step 1: take a photo of your face</h2>
          <span className="back" onClick={this.props.resetMethod}>
            <i className="material-icons">arrow_back</i>Go Back
          </span>
          <div className="actions">
            {button1}
            {button2}
          </div>
          {frame}
        </div>
      </div>
    );
  };

  renderDocWebcam = () => {
    const button1 = this.props.documents.docPhoto.length ? (
      <div className="btn btn-primary" onClick={this.props.resetDocPhoto}>
        Re-take
      </div>
    ) : (
      <div className="btn btn-primary" onClick={this.captureDocPhoto}>
        Capture
      </div>
    );
    const button2 = this.props.documents.docPhoto.length ? (
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    ) : null;
    const frame = this.props.documents.docPhoto.length ? (
      <div className="preview">
        <img src={this.props.documents.docPhoto} />
      </div>
    ) : (
      <Webcam
        audio={false}
        ref={this.setDocWebcamRef}
        screenshotFormat="image/png"
      />
    );
    return (
      <div className="live-verify">
        <div className="form-info form-info--full">
          <h2>Step 2: take a photo of your documents</h2>
          <div
            className="back"
            onClick={() => this.setState({ step: this.state.step - 1 })}
          >
            <i className="material-icons">arrow_back</i>
            Back To Step 1
          </div>
          <div className="actions">
            {button1}
            {button2}
          </div>
          {frame}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="verification__body">
        {this.state.step === 1
          ? this.renderFaceWebcam()
          : this.renderDocWebcam()}
      </div>
    );
  }
}
