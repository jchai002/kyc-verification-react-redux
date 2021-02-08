import React from "react";

export default function(props) {
  const { isVerifyPage } = props;
  const finalText = isVerifyPage ? "Need Help?" : "Already Registered?";
  const finalUrl = isVerifyPage ? "#" : "/already-registered";
  return (
    <div className="form-footer form-content">
      <p>Do you need additional information?</p>
      <div className="form-footer__links">
        <a
          href="https://stowittoken.com/how-it-works"
          target="_blank"
          className="btn btn-hollow"
        >
          Who's Eligible?
        </a>
        <a
          href="https://stowittoken.com"
          target="_blank"
          className="btn btn-hollow"
        >
          Token Info
        </a>
        <a href={finalUrl} className="btn btn-hollow">
          {finalText}
        </a>
      </div>
    </div>
  );
}
