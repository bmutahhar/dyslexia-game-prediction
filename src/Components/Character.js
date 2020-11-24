import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

export default class Character extends Component {
  render() {
    return (
      <Animation className={this.props.className} onClick={this.props.onClick}>
        <img
          src={this.props.src}
          alt={this.props.alt}
          onerror={this.props.onerror}
          style={this.props.style}
        />
      </Animation>
    );
  }
}

const Animation = styled.div`
  margin: 0;
  padding: 0;
  ${(props) =>
    props.isAnimated &&
    `
animation: infinite 1s ${props.animation}
`}
`;
