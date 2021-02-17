import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import tilebg from "../Images/backgrounds/tilebg.png";

import {

    Timer,

    Tile,

} from "../Components";

export default class DisplayTile extends Component {
    render() {

        const Container = styled.div`
        display: flex;
flex-direction: column;
align-items: center;
        `;
        const Qinfo = styled.p`
        margin-top: 30px;
        font-size: 1vw;
        color: white;
        `;
        const DisplayTile = styled.div`
box-sizing: border-box;
        height: 13.5vw;
        width: 13.5vw;
        background-color: rgba(255, 255, 255, 0.11);
        backdrop-filter: blur(10px);
        border: 3px solid #C9C4C4;
        border-radius: 5px;
        
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;

`;

        const AgainButton = styled.button`
width: 11vw;
height: 4vw;

border-radius: 50px;

background-color: green;
color: white;
align-items: center;
font-size: 1vw;

`;

        return (
            <Container>
                <DisplayTile>
                    <Timer>00:00</Timer>
                    <Tile></Tile>
                </DisplayTile>
                <Qinfo>Select the matching tile from below as shown above</Qinfo>
                <AgainButton>Show Again</AgainButton>

            </Container>

        );
    }
}