import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import gamebg from "../Images/backgrounds/gamebg.png";
import tilebg from "../Images/backgrounds/tilebg.png";
import larka from "../Images/characters/larka2.svg";

import {
    Player,
    ProfileAvatar,
    Timer,
    CustomStepper,
    NextButton,
    SubmitButton,
    Character,
    Tile,
    Tileplacer,
    DisplayTile,
    CompletePuzzle,
    DragDrop,
    NameImage,

} from "../Components";
import { motion } from "framer-motion";

export default class PreSchooler extends Component {
    render() {
        return <PreSchoolerLevel />;
    }
}




const PreSchoolerLevel = () => {

    return (

        <Container className="container-fluid" style={styles.gameBackground}>


            <Header className="row">
                <Badges className="col-2"><Name>badges</Name></Badges>
                <ProgressBar className="col-8"><Name>progressbar</Name></ProgressBar>
                <Profile className="col-2"><Name>profileimage</Name></Profile>
            </Header>
            <GameArea className="row">
                <Avatarmsg className="col-2">
                    <Character
                        className="avatar"
                        src={larka}
                        alt="Boy Avatar"
                        style={styles.avatar}
                    />
                </Avatarmsg>
                <Mainarea className="col-8">
                    {/* <DragArea>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                    </DragArea>

                    <Qinfo>Listen and complete the word by dragging the tiles</Qinfo>
                    <Player color="white"></Player> */}

                    {/* <DisplayTile></DisplayTile> */}

                    {/* <CompletePuzzle></CompletePuzzle> */}

                    {/* <DragDrop></DragDrop> */}

                    <NameImage></NameImage>




                </Mainarea>
                <Emptyspace className="col-2"></Emptyspace>
            </GameArea>
            <Gameoption className="row justify-content-end">
                <AnswerSelection className="col-8">
                    <Tile></Tile>
                    <Tile></Tile>
                    <Tile></Tile>
                    <Tile></Tile>


                </AnswerSelection>
                <AnswerSubmit className="col-2"><Name>submit/next buttons</Name></AnswerSubmit>
            </Gameoption>
        </Container>


    );
};

const AgainButton = styled.button`
width: 11vw;
height: 4vw;

border-radius: 50px;

background-color: green;
color: white;
align-items: center;
font-size: 1vw;

`;
const Qinfo = styled.p`
margin-top: 30px;
font-size: 1vw;
color: white;
`;
const Name = styled.h2`
font-size: 2vw;
color: white;
`;
const Container = styled.div`
height: 100vh;


`;

const Header = styled.div`
border: 2px solid black;
height: 8vh;


`;
const GameArea = styled.div`
border: 2px solid black;
height: 70vh;


`;
const Gameoption = styled.div`
height: 22vh;


`;
const Badges = styled.div`
border: 2px solid red;


`;
const Avatarmsg = styled.div`
border: 2px solid red;
height: 91.5vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;


`;
const Avatar = styled.div`
border: 2px solid red;


`;
const ProgressBar = styled.div`
border: 2px solid yellow;


`;
const Mainarea = styled.div`

border: 2px solid yellow;
display: flex;
flex-direction: column;

align-items: center;
padding-top: 15vh;

`;

const DragArea = styled.div`
display: flex;
align-items: center;
justify-content: center;


`;

const AnswerSelection = styled.div`
display: flex;
border: 2px solid yellow;
align-items: center;
justify-content: center;



`;
const Profile = styled.div`
border: 2px solid green;


`;
const Emptyspace = styled.div`
border: 2px solid green;


`;
const AnswerSubmit = styled.div`
border: 2px solid green;


`;


const Tileholder = styled.div`
box-sizing: border-box;
height: 10vw;
width: 10vw;
background-color: rgba(197, 133, 47, 0.6);
filter: brightness(65%);
border: 2px solid #707070;
border-radius: 5px;

`;
const Audioplayer = styled.div`
box-sizing: border-box;
height: 4vw;
width: 35vw;
background-color: rgba(255, 255, 255, 0.11);
backdrop-filter: blur(10px);
border: 2px solid #C9C4C4;
border-radius: 50px;
margin-top: 20px;



`;





const styles = {
    gameBackground: {
        backgroundImage: "url(" + gamebg + ")",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },

    Tile: {
        backgroundImage: "url(" + tilebg + ")",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },

    avatar: {
        // width: "100%",
        height: "20vw",
    },
};

