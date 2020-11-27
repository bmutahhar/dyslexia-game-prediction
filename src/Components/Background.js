import React, { Component } from "react";

export default class Background extends Component {
  render() {
    const styles = {
      backgroundImage: `url(${this.props.src})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100vh",
      width: "100%",
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
