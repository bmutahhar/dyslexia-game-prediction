


import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { pulse } from "react-animations";

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
            onerror={this.props.onerror}
            style={this.props.style}

          >

          </Animated>
        ) : (
            <NonAnimated
              className={this.props.className}
              onClick={this.props.onClick}


              src={this.props.src}
              alt={this.props.alt}
              onerror={this.props.onerror}
              style={this.props.style}
            >
            </NonAnimated>
          )}
      </Container>
    );
  }
}

const pulseAnimation = keyframes`${pulse}`;
const Container = styled.div``;
const Animated = styled.img`



animation: infinite 1s ${pulseAnimation};



`;
const NonAnimated = styled.img`
animation: none;

`;