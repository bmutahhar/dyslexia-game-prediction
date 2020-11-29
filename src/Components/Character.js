import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { pulse, zoomInUp, zoomInDown, bounce, zoomIn } from "react-animations";

export default class Character extends Component {
  render() {
    return (
      <Container>
        {this.props.isAnimated ? (
          <Animated
            className={this.props.className}
            onClick={this.props.onClick}
            src={this.props.src}
            alt={this.props.alt}
            onError={this.props.onError}
            style={this.props.style}
            animation={this.props.animation}
          ></Animated>
        ) : (
          <NonAnimated
            className={this.props.className}
            onClick={this.props.onClick}
            src={this.props.src}
            alt={this.props.alt}
            onError={this.props.onError}
            style={this.props.style}
          ></NonAnimated>
        )}
      </Container>
    );
  }
}

const animations = {
  pulse: keyframes`${pulse}`,
  zoomInUp: keyframes`${zoomInUp}`,
  zoomIn: keyframes`${zoomIn}`,
  zoomInDown: keyframes`${zoomInDown}`,
  bounce: keyframes`${bounce}`,
};

const Container = styled.div``;
const Animated = styled.img`
  animation: 1.2s ease-in 0.5s infinite
    ${(props) => {
      return animations[props.animation];
    }};

  &:hover {
    cursor: pointer;
  }
`;
const NonAnimated = styled.img``;
