import React, { Component } from "react";
import {
  storeFacePhoto,
  storeDocPhoto,
  resetFacePhoto,
  resetDocPhoto
} from "app/actions/verification";
import DropzoneS3Uploader from "react-dropzone-s3-uploader";
import Dropzone from "react-dropzone";
import Man from "app/assets/images/man.svg";
import ID from "app/assets/images/id.svg";
import Checkmark from "app/assets/images/checkmark.svg";
import { connect } from "react-redux";

@connect(({ documents }) => ({ documents }), {
  storeFacePhoto,
  storeDocPhoto,
  resetFacePhoto,
  resetDocPhoto
})
export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null
    };
  }

  handleDrop = files => {
    const { type } = this.props;
    const file = files[0];
    const { preview } = file;
    this.toBase64(file).then(base64String => {
      const text =
        type === "face"
          ? this.props.storeFacePhoto(base64String)
          : this.props.storeDocPhoto(base64String);
      this.setState({ preview });
    });
  };

  toBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  render() {
    const { type } = this.props;
    const bgImage = type === "face" ? Man : ID;
    const instructionText =
      type === "face" ? "Upload your photo" : "Upload official id";
    var changePhoto = this.state.preview ? (
      <p className="change-photo">Change Photo</p>
    ) : null;
    var checkmark = this.state.preview ? (
      <img role="presentation" src={Checkmark} className="checkmark" />
    ) : null;

    return (
      <div className="choice">
        <img role="presentation" src={this.state.preview || bgImage} />
        <Dropzone
          className="dropzone"
          accept="image/*"
          style={null}
          activeStyle={null}
          activeClassName="dropzone-active"
          onDrop={this.handleDrop}
        />

        <div className="instruction">
          {checkmark}
          <p>{instructionText}</p>
        </div>
        {changePhoto}
      </div>
    );
  }
}
