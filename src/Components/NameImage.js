import React, { Component } from "react";
import styled from "styled-components";


import larka from "../Images/characters/larka2.svg";


import {


    Tileplacer,
    Character,
    Tile,


} from "../Components";

export default class NameImage extends Component {
    render() {



        const DragArea = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        `;

        const QuestionContainer = styled.div`
        padding-top: 5%;
        height: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid green;
        `;

        const AnswerContainer = styled.div`
        
        display: flex;
        height: 30%;
        align-items: center;
        justify-content: center;
        border: 2px solid yellow;

        `;

        const MainContainer = styled.div`
        height: 100%;
        width: 66.66%;
        display: flex;
        flex-direction: column;

        `;
        const Qinfo = styled.p`
margin-top: 30px;
font-size: 1vw;
color: white;
        `;




        return (
            <MainContainer>

                <QuestionContainer>


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



                </QuestionContainer>
                <AnswerContainer>
                    <Tile></Tile>
                    <Tile></Tile>

                    <Tile></Tile>

                    <Tile></Tile>

                </AnswerContainer>
            </MainContainer>


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