import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import tilebg from "../Images/backgrounds/tilebg.png";

export default class Tile extends Component {
    render() {

        const Tile = styled.div`
font-size: 4vw;
font-family: 'Russo One', sans-serif;
color: #910D0A;
box-sizing: border-box;
height: 8vw;
width: 8vw;
border: 4px solid #5A110F;
border-radius: 5px;
margin-left: 5px;
margin-right: 5px;
display:flex;
align-items: center;
justify-content: center;
background-image: url(${(props) => props.background});
transition: 0.2s ease-in-out;

transform : perspective(500px) translateZ(0px);


&:hover {
 transform : perspective(500px) translateZ(50px);
}


`;

        return (
            <Tile background={tilebg}>F</Tile>
        );
    }
}