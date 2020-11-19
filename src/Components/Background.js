import React, { Component } from "react";

export default class Background extends Component {
  render() {
    const styles = {
      backgroundImage: `url(${this.props.src})`,
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: "100vh",
      minWidth: "100vw",
      height: "100vh",
      width: "100vw",
    };
    return (
      <div className={`container-fluid ${this.props.className}`} style={this.props.customStyle? Object.assign(styles,this.props.style) : styles}>
        {this.props.children}
      </div>
    );
  }
}
