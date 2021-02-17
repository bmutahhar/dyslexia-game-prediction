import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

export default class Tileplacer extends Component {
    render() {

        const Tileplacer = styled.div`
        box-sizing: border-box;
        height: 10vw;
        width: 10vw;
        background-color: rgba(255, 255, 255, 0.11);
        backdrop-filter: blur(10px);
        border: 3px solid #C9C4C4;
        margin-left: 5px;
        margin-right: 5px;
        
        
        `;





        return (
            <Tileplacer></Tileplacer>
        );
    }
}