import React from "react";
import InfoActive from "app/assets/images/active_info.svg";
import InfoInactive from "app/assets/images/inactive_info.svg";
import DocumentsActive from "app/assets/images/active_documents.svg";
import DocumentsInactive from "app/assets/images/inactive_documents.svg";
import SuccessActive from "app/assets/images/active_success.svg";
import SuccessInactive from "app/assets/images/inactive_success.svg";
import ErrorActive from "app/assets/images/active_error.svg";

export default function(props) {
  const { step } = props;
  var verifyText = "Verified";
  var verifyImage = SuccessInactive;
  if (step === "verified") {
    verifyImage = SuccessActive;
  }
  if (step === "error") {
    verifyImage = ErrorActive;
    verifyText = "Not Verified";
  }
  return (
    <div className="steps-display">
      <div className={`steps__info ${step === "info" ? "active" : ""}`}>
        <img
          src={step === "info" ? InfoActive : InfoInactive}
          role="presentation"
        />
        <span>Personal Info</span>
      </div>
      <div
        className={`steps__documents ${step === "documents" ? "active" : ""}`}
      >
        <img
          src={step === "documents" ? DocumentsActive : DocumentsInactive}
          role="presentation"
        />
        <span>Verify Documments</span>
      </div>
      <div
        className={`steps__verified ${
          step === "verified" || step === "error" ? "active" : ""
        }`}
      >
        <img src={verifyImage} role="presentation" />
        <span>{verifyText}</span>
      </div>
    </div>
  );
}
