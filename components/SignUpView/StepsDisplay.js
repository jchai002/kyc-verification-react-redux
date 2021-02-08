import React from "react";
import EmailActive from "app/assets/images/active_email.svg";
import EmailInactive from "app/assets/images/inactive_email.svg";
import EthActive from "app/assets/images/active_wallet.svg";
import EthInactive from "app/assets/images/inactive_wallet.svg";
import ContributionActive from "app/assets/images/active_contribution.svg";
import ContributionInactive from "app/assets/images/inactive_contribution.svg";
import SuccessActive from "app/assets/images/active_success.svg";
import SuccessInactive from "app/assets/images/inactive_success.svg";

export default function(props) {
  const { step } = props;
  return (
    <div className="steps-display">
      <div className={`steps__email ${step === "email" ? "active" : ""}`}>
        <img
          src={step === "email" ? EmailActive : EmailInactive}
          role="presentation"
        />
        <span>Email</span>
      </div>
      <div className={`steps__eth ${step === "eth" ? "active" : ""}`}>
        <img
          src={step === "eth" ? EthActive : EthInactive}
          role="presentation"
        />
        <span>ETH Address</span>
      </div>
      <div
        className={`steps__contribution ${
          step === "contribution" ? "active" : ""
        }`}
      >
        <img
          src={
            step === "contribution" ? ContributionActive : ContributionInactive
          }
          role="presentation"
        />
        <span>Contribution</span>
      </div>
      <div className={`steps__success ${step === "success" ? "active" : ""}`}>
        <img
          src={step === "success" ? SuccessActive : SuccessInactive}
          role="presentation"
        />
        <span>Success</span>
      </div>
    </div>
  );
}
