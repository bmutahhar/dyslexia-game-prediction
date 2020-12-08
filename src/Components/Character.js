import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
<<<<<<< HEAD
import { pulse, zoomInUp, zoomInDown, bounce, zoomIn, fadeIn } from "react-animations";
import shortid from "shortid";
=======
import { pulse, zoomInUp, zoomInDown, bounce, zoomIn } from "react-animations";
>>>>>>> 989859afb066510ff375dde6dfa3b8d00ce37e3a

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
            transition={this.props.transition}
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
  fadeIn: keyframes`${fadeIn}`,


};

const Container = styled.div``;
const Animated = styled.img`
  animation: ${(props) => {
    return `${props.transition}`;
  }}
  ${(props) => animations[props.animation]};}

  &:hover {
    cursor: pointer;
  }
`;
const NonAnimated = styled.img``;
