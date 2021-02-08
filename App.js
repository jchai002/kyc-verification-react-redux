import React, { Component } from "react";
import "app/assets/styles/app.scss";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <main>{this.props.children}</main>
      </div>
    );
  }
}
