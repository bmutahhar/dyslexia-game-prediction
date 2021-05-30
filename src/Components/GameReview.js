import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Backdrop } from "@material-ui/core";
import StarRatings from "react-star-ratings";
import { FaWhatsappSquare, FaClipboard } from 'react-icons/fa';
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
const GameReview = () => {
    return (
        <Container className="container-fluid">
            <ReviewCard>
                <Heading className="row">
                    <h1>Give Us A Review</h1>

                </Heading>
                <div className="row" style={{ width: '100%', height: '10%' }}>
                    <Rating className="col-6">
                        <p style={{ paddingTop: 5 }}>Rating:</p>
                        <StarRatings
                            rating={4.5}
                            starRatedColor="yellow"
                            numberOfStars={5}
                            name="rating"
                            starDimension="2vw"
                            starSpacing="3px"
                        />
                    </Rating>
                    <Share className="col-6">
                        <p style={{ paddingTop: 5 }}>Share:</p>
                        <div>
                            <FaWhatsappSquare color="#00d620" size="2.5vw" style={{ marginRight: 10, marginTop: 5 }}></FaWhatsappSquare>
                            <FaClipboard color="#0cb095" size="2.5vw" style={{ marginLeft: 10, marginTop: 5 }}></FaClipboard>
                        </div>


                    </Share>
                </div>
                <div className="row" style={{ width: '100%', height: '30%' }}>

                    <Feedback className="col-12">
                        <InputTextField
                            id="outlined-multiline-flexible"
                            placeholder="Give Us A Feedback"
                            multiline
                            rowsMax={4}
                            variant="outlined"
                        />
                    </Feedback>

                </div>

                <NavButtons className="row">
                    <PlayButton>Submit</PlayButton>
                    <ExitButton>Cancel</ExitButton>
                </NavButtons>
            </ReviewCard>
        </Container>
    )
}

export default GameReview;
const Feedback = styled.div`
display: flex;
align-items: flex-start;
height: 100%
`;
const Share = styled.div`
font-size: 1.5vw;
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: space-between;
height: 100%;
`;
const Rating = styled.div`
font-size: 1.5vw;
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: space-around;
height: 100%;
`;
const Heading = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 20%;
`;
const Container = styled.div`
display: flex;
height: 100vh;
align-items: center;
justify-content: center;

`;
const ReviewCard = styled.div`
text-align: center;
color: white;
display: flex;
flex-direction: column;
background-image: linear-gradient(to bottom, #388258, #0e0e13);

border-radius: 20px;
border: 6px solid #5bc45f;
width: 60vw;
height: 35vw;
align-items: center;
justify-content: space-around;


`;

const PlayButton = styled.button`
  border-radius: 7px;
  border: none;
  color: white;
  background-color: #3fcb6e;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 35%;
  height: 90%;
  transition: 0.15s ease-out;
  &:hover {
    background-color: #209146;
    transition: 0.15s ease-out;
  }
  &:active {
    transform: translateY(5px);
    transition: 0.15s ease-out;
  }
`;

const ExitButton = styled.button`
  border-radius: 7px;
  border: none;
  color: white;
  background-color: #cb3f3f;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 35%;
  height: 90%;
  transition: 0.15s ease-out;
  &:hover {
    background-color: #9c2222;
    transition: 0.15s ease-out;
  }
  &:active {
    transform: translateY(5px);
    transition: 0.15s ease-out;
  }
`;

const NavButtons = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-around;
  height: 15%;
  width: 100%;
`;

const InputTextField = withStyles({
    root: {
        backgroundColor: "white",
        borderRadius: "5px",
        border: "2px",
        color: "black",
        width: "100%",
        height: "100%",



        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFFFFF",
        },

        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderWidth: "1px",
                borderColor: "#FFFFFF",
                width: "100%",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#FFFFFF",
            },
            "& .MuiOutlinedInput-input": {
                fontSize: "1.5vw",

            },
        },
    },
})(TextField);