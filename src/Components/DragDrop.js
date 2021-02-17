import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import tilebg from "../Images/backgrounds/tilebg.png";

import {

    Timer,

    Tile,
    Tileplacer,
    Player,

} from "../Components";

export default class DragDrop extends Component {
    render() {



        const DragArea = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        `;

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




        return (
            <Container>


                <DragArea>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                </DragArea>

                <Qinfo>Listen and complete the word by dragging the tiles</Qinfo>
                <Player color="white"></Player>



            </Container>

        );
    }
}