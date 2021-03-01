import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";


import {
    Tileplacer,
    Tile,
    AvatarMessage,
    NextButton,
    UIButton,
} from "../../Components";

import larka from "../../Images/characters/larka2.svg";


const TileLayout = () => {
    return (
        <MainContainer>
            <AvatarMessage className="col-2" src={larka} alt="Boy avatar" />
            <GameArea className="col-8">
                <QuestionContainer className="row">

                    <TileGrid>
                        <Tile>A</Tile>
                        <Tile>B</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>



                    </TileGrid>

                    <GridPlacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                        <Tileplacer></Tileplacer>
                    </GridPlacer>
                    <TileGrid>
                        <Tile>A</Tile>
                        <Tile>B</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>
                        <Tile>C</Tile>



                    </TileGrid>

                    {/* <Qinfo>Drag and place the tiles in the grid as was shown</Qinfo> */}

                </QuestionContainer>

            </GameArea>
        </MainContainer>
    );
};

export default TileLayout;


const GridPlacer = styled.div`
  
  display: grid;
  grid-template-columns: 8vw 8vw 8vw 8vw;
  grid-row: auto auto;
`;

const TileGrid = styled.div`
  
  display: grid;
  grid-template-columns: 7vw 7vw;
  grid-row: auto auto;
  align-items: center;
  justify-content: center;
  grid-column-gap: 5px;
`;

const PictureTile = styled.div`
  box-sizing: border-box;
  height: 9.5vw;
  width: 9.5vw;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s ease-in-out;

  transform: perspective(500px) translateZ(0px);

  &:hover {
    transform: perspective(500px) translateZ(50px);
  }
`;

const QuestionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;



const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  ${"" /* align-items: center; */}
  ${"" /* justify-content: center; */}
`;
const Qinfo = styled.p`
  margin-top: 30px;
  font-size: 1vw;
  color: white;
`;

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
`;

const GameArea = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid cyan;
`;