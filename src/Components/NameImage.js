import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import tilebg from "../Images/backgrounds/tilebg.png";

import larka from "../Images/characters/larka2.svg";


import {

    Timer,

    Tile,
    Tileplacer,
    Player,
    Character,

} from "../Components";

export default class NameImage extends Component {
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
                    <Character
                        className="avatar"
                        src={larka}
                        alt="Boy Avatar"
                        style={styles.avatar}
                    />
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                </DragArea>

                <Qinfo>Name the character by dragging the tiles</Qinfo>



            </Container>

        );
    }
}

const styles = {


    avatar: {
        // width: "100%",
        height: "15vw",
        marginRight: "2vw"
    },
};