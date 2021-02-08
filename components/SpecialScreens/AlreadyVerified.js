import React from "react";
export default function() {
  return (
    <div className="page error-screen">
      <div className="form-content form-main">
        <div className="form-intro">
          <h1>KYC Verification Completed</h1>
          <p>
            Our records show that you have finished the KYC verification
            process. When the crowdsale date is approaching you will receive
            emails notifying you when and how you can contribute. In the
            meantime we will continue to make announcements on our{" "}
            <a href="https://stowittoken.com/">website</a>{" "}and{" "}
            <a href="https://t.me/stowittoken">Telegram channel</a>.
          </p>
          <p>
            Still need help? <a href="mailto:info@stowittoken.com">Contact us</a> and we can help
            you out. Be prepared to provide the original email, ETH Address and
            contribution amount you provided when first registering.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
