import React, { Component } from "react";

export default class Character extends Component {
  render() {
    return (
      <div className={this.props.className}
       style={{ margin: 0, padding: 0 }}
       >
        <img
          src={this.props.src}
          alt={this.props.alt}
          onerror={this.props.onerror}
          style={this.props.style}
        />
      </div>
    );
  }
}
