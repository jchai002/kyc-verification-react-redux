import React from "react";
export default function() {
  return (
    <div className="page error-screen">
      <div className="form-content form-main">
        <div className="form-intro">
          <h1>Unauthorized</h1>
          <p>
            Sorry, you are not allowed to see this page, please{" "}
            <a href="/">register</a> first.
          </p>
        </div>
      </div>
    </div>
  );
}
