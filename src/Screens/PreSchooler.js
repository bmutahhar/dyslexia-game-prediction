import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import gamebg from "../Images/backgrounds/gamebg.png";
import tilebg from "../Images/backgrounds/tilebg.png";

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
                <Avatarmsg className="col-2"><Name>avatarmsg</Name></Avatarmsg>
                <Mainarea className="col-8">
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>
                    <Tileplacer></Tileplacer>


                </Mainarea>
                <Emptyspace className="col-2"></Emptyspace>
            </GameArea>
            <Gameoption className="row">
                <Avatar className="col-2"><Name>avatar</Name></Avatar>
                <AnswerSelection className="col-8">
                    <Tile background={tilebg}>E</Tile>
                    {/* <Tile style={styles.Tile}></Tile> */}
                    {/* <Tile style={styles.Tile}></Tile> */}
                    {/* <Tile style={styles.Tile}></Tile> */}
                    {/* <Tile style={styles.Tile}></Tile> */}

                </AnswerSelection>
                <AnswerSubmit className="col-2"><Name>submit/next buttons</Name></AnswerSubmit>
            </Gameoption>
        </Container>


    );
};

const Qinfo = styled.p`
font-size: 0.8vw;
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