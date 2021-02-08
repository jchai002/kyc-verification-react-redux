import React from "react";
export default function() {
  return (
    <div className="page error-screen">
      <div className="form-content form-main">
        <div className="form-intro">
          <h1>Too Many Attempts</h1>
          <p>
            Our records show that you have failed KYC verification three times.
            For security puposes we only allow each participant to try three
            times. If you think there has been a mistake, please{" "}
            <a href="mailto:info@stowittoken.com">contact us</a> and we’ll be glad to look into
            your case.
          </p>
        </div>
      </div>
    </div>
  );
}
