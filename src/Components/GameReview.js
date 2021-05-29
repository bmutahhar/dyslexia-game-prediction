import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Backdrop } from "@material-ui/core";
import StarRatings from "react-star-ratings";

const GameReview = () => {
    return (
        <Container className="container-fluid">
            <ReviewCard>
                <h3>If you liked our game please do give us a review</h3>
                <StarRatings
                    rating={4.5}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    name="rating"
                    starDimension="4vw"
                    starSpacing="10px"
                />
                <NavButtons>
                    <PlayButton>Submit</PlayButton>
                    <ExitButton>Cancel</ExitButton>
                </NavButtons>
            </ReviewCard>
        </Container>
    )
}

export default GameReview;
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
padding: 5vw 5vw 2vw 5vw;

border-radius: 20px;
border: 6px solid #5bc45f;
width: 50vw;
height: 30vw;
align-items: center;
justify-content: space-between;

`;

const PlayButton = styled.button`
  border-radius: 7px;
  border: none;
  color: white;
  background-color: #3fcb6e;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 40%;
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
  width: 40%;
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
  height: 20%;
  width: 100%;
`;