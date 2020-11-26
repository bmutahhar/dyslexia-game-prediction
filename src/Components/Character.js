


import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { bounce, pulse } from "react-animations";

export default class Character extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

const bounceAnimation = keyframes`${pulse}`;

const Animated = styled.img`

animation: infinite 1s ${bounceAnimation};



`;
const NonAnimated = styled.img`
animation: none;

`;