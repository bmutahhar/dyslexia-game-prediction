import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import tilebg from "../Images/backgrounds/tilebg.png";

import {

    Timer,

    Tile,
    Tileplacer,

} from "../Components";

export default class CompletePuzzle extends Component {
    render() {
        const Puzzlepicture = styled.div`
background-color: red;
width: 20vw;
  height: 20vw;
  margin-right: 3vw;
`;
        const PuzzleGrid = styled.div`
  width: 20vw;
  height: 20vw;
  display:grid;
  grid-template-columns: 10vw 10vw;
  grid-row: auto auto;
  
  margin-left: 3vw;

`;
        const Container = styled.div`
display: flex;
flex-direction: row;
align-items: center;
        `;
        const Qinfo = styled.p`
        margin-top: 30px;
        font-size: 1vw;
        color: white;
        `;




        return (
            <Container>

                <Puzzlepicture></Puzzlepicture>
                <Qinfo>Complete the picture puzzle as shown</Qinfo>
                <PuzzleGrid>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                </PuzzleGrid>


            </Container>

        );
    }
}