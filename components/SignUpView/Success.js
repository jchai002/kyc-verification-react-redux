import React, { Component } from "react";
import StepsDisplay from "./StepsDisplay";
import TelegramLogo from "app/assets/images/telegram.svg";
import TwitterLogo from "app/assets/images/twitter.svg";
import MediumLogo from "app/assets/images/medium.svg";
import RedditLogo from "app/assets/images/reddit.svg";

export default class Success extends Component {
  render() {
    return (
      <div className="success">
        <StepsDisplay step={"success"} />
        <div className="form-info">
          <p>
            Congratulations! You have successfully registered for the STOW IT
            Token crowdsale. You should receive an email in the next few minutes
            with your unique link for identity verification.
          </p>
        </div>
        <div className="social">
          <p>Join the conversation</p>
          <div className="social__links">
            <a href="https://t.me/stowittoken" target="_blank">
              <img role="presentation" src={TelegramLogo} />
            </a>
            <a href="https://twitter.com/_stow_?lang=en" target="_blank">
              <img role="presentation" src={TwitterLogo} />
            </a>
            <a href="https://medium.com/@STOWITTOKEN" target="_blank">
              <img role="presentation" src={MediumLogo} />
            </a>
            <a href="https://www.reddit.com/r/STOW_IT_Token/" target="_blank">
              <img role="presentation" src={RedditLogo} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
