import React, { Component } from "react";
import styled from "styled-components";

import {

    Timer,

    Tile,
    UIButton,

} from "../Components";

export default class DisplayTile extends Component {
    render() {

        const QuestionContainer = styled.div`
        padding-top: 5%;
        height: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid green;
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

        //         const AgainButton = styled.button`
        // width: 11vw;
        // height: 4vw;

        // border-radius: 50px;

        // background-color: green;
        // color: white;
        // align-items: center;
        // font-size: 1vw;

        // `;

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

        return (
            <MainContainer>

                <QuestionContainer >
                    <DisplayTile>
                        <Timer initialSeconds={0} initialMinutes={0} />

                        <Tile></Tile>
                    </DisplayTile>
                    <Qinfo>Select the matching tile from below as shown above</Qinfo>
                    <UIButton variant="filled" type="button">
                        Show Again
            </UIButton>
                </QuestionContainer>
                <AnswerContainer >

                    <Tile></Tile>
                    <Tile></Tile>
                    <Tile></Tile>
                    <Tile></Tile>

                </AnswerContainer>

            </MainContainer>


        );
    }
}