import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import gamebg from "../Images/backgrounds/gamebg.png";
import tilebg from "../Images/backgrounds/tilebg.png";
import { Player } from "../Components";
import { motion } from "framer-motion";

export default class PreSchooler extends Component {
    render() {
        return <PreSchoolerLevel />;
        <script src="C:\Users\IDEAPAD\Desktop\fyp\dyslexia-game-prediction\public\plain-draggable.min.js"></script>

        const draggable = new PlainDraggable(document.getElementById('draggable'));
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
                <Avatarmsg className="col-2"><Name>avatarmsg</Name></Avatarmsg>
                <Mainarea className="col-8">
                    <DragArea>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                    </DragArea>

                    <Qinfo>Listen and complete the word by dragging the tiles</Qinfo>
                    <Player color="white"></Player>



                </Mainarea>
                <Emptyspace className="col-2"></Emptyspace>
            </GameArea>
            <Gameoption className="row">
                <Avatar className="col-2"><Name>avatar</Name></Avatar>
                <AnswerSelection className="col-8">
                    <motion.div
                        drag


                    >
                        <Tile background={tilebg}

                        >E</Tile>
                    </motion.div>

                    <Tile background={tilebg}>F</Tile>
                    <Tile background={tilebg}>C</Tile>
                    <Tile background={tilebg}>D</Tile>
                    <Tile background={tilebg}>C</Tile>

                </AnswerSelection>
                <AnswerSubmit className="col-2"><Name>submit/next buttons</Name></AnswerSubmit>
            </Gameoption>
        </Container>


    );
};

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
border: 2px solid black;
height: 22vh;


`;
const Badges = styled.div`
border: 2px solid red;


`;
const Avatarmsg = styled.div`
border: 2px solid red;


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
justify-content: center;


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
const Tileplacer = styled.div`
box-sizing: border-box;
height: 8.5vw;
width: 8.5vw;
background-color: rgba(255, 255, 255, 0.11);
backdrop-filter: blur(10px);
border: 3px solid #C9C4C4;
border-radius: 5px;
margin-left: 5px;
margin-right: 5px;


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

const Tileholder = styled.div`
box-sizing: border-box;
height: 10vw;
width: 10vw;
background-color: rgba(197, 133, 47, 0.6);
filter: brightness(65%);
border: 2px solid #707070;
border-radius: 5px;

`;

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
};