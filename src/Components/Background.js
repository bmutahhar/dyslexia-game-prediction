import React, { Component } from "react";

export default class Background extends Component {
  render() {
    const styles = {
      backgroundImage: `url(${this.props.src})`,
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      // minHeight: "100vh",
      // minWidth: "100%",
      height: "100vh",
      width: "100%",
      // padding: "0px",
      // margin: "0px",
    };
    return (
      <div
        className={`container-fluid ${this.props.className}`}
        id = {this.props.id}
        style={
          this.props.customStyle
            ? Object.assign(styles, this.props.style)
            : styles
        }
      >
        {this.props.children}
      </div>
    );
  }
}
