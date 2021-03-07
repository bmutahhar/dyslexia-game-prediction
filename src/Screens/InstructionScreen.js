import React from "react";
import styled from "styled-components";
import { Typography, Backdrop } from "@material-ui/core";
import gamebg from "../Images/backgrounds/gamebg.png";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";



import { NextButton } from "../Components";

const InstructionScreen = ({onClick}) => {
    const alt = "Badge";
    const classes = useStyles();

    return (
        <MainContainer className="container-fluid" background={gamebg}>
            <Typography variant="subtitle1" style={{
                color: "white",

                fontSize: "2.5vw",
                marginTop: "20px",
            }} > Game Instructions For Parents</Typography>
            <Instructions>

                <ul>
                    <List>Read out the questions to your child and help him/her understand as to how to solve them</List>
                    <List>Do not help your child in answering the questions</List>
                    <List>A parent should stay with the child throughout the game</List>
                    <List>Keep any and everything away from your child that might distract his/her attention</List>
                    <List>Keep on encourging your child throughout the game</List>
                    <List>Do not get distracted yourself and notice your child's performance</List>

                </ul>
            </Instructions>
            <Proceed>
                <Typography variant="subtitle1" style={{
                    color: "white",

                    fontSize: "1.5vw",
                    marginLeft: "6vw",
                }}
                >
                    Proceed To The Game
                    </Typography>
                <NextButton onClick={onClick} />
            </Proceed>
        </MainContainer >

    );
};

export default InstructionScreen;

const List = styled.li`
color: #faf6f3;
font-size: 1.6vw;
margin-top: 1vw;
`;
const Instructions = styled.div`
display: flex;
flex-direction: column;
width: 70vw;
height: 70vh;
border-radius: 10px;
padding-left: 5vw;
padding-top: 5vw;
background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid #c9c4c4;

`;
const Proceed = styled.div`
display: flex;
flex-direction: row;
background-color: rgba(47, 255, 0, 0.5);
width: 30vw;
height: 4.4vw;
border-radius: 50px;
align-items: center;
font-align: center;
justify-content: space-between;
backdrop-filter: blur(20px);
margin-top: 20px;


`;
const MainContainer = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
background-image: url(${({ background }) => background});
background-size: cover;
background-repeat: no-repeat;
background-position: top center;
align-items: center;
justify-content: flex-start;


`;


const useStyles = makeStyles(({ theme }) => ({

    backdrop: {
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(18px)",
    },
}));