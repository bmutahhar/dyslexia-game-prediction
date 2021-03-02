import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
    Tileplacer,
    Tile,

    AvatarMessage,
    NextButton,
    UIButton,
    Timer,
} from "../../Components";
import { addAnswer } from "../../actions";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";

const SelectOption = () => {

    const [show, setShow] = useState(true);

    const closeQuestion = () => {
        setShow(false);
    };

    return (
        <MainContainer>
            <AvatarMessage className="col-2"
                src={larki}
                alt={"Girl Avatar"}></AvatarMessage>
            <GameArea className="col-8">
                {show ? (
                    <AnimatePresence>

                        <QuestionContainer className="row">
                            <Timer
                                initialSeconds={4}
                                initialMinutes={0}
                                reverse
                                callBack={closeQuestion}
                            />

                            <GridPlacer>
                                <Tileplacer>
                                    <Tile></Tile>
                                </Tileplacer>
                            </GridPlacer>

                        </QuestionContainer>

                    </AnimatePresence>
                ) : (

                        <QuestionContainer className="row">

                            <AgridPlacer>
                                <Tileplacer>
                                    <Tile></Tile>
                                </Tileplacer>
                                <Tileplacer>
                                    <Tile></Tile>
                                </Tileplacer>
                                <Tileplacer>
                                    <Tile></Tile>
                                </Tileplacer>
                                <Tileplacer>
                                    <Tile></Tile>
                                </Tileplacer>
                            </AgridPlacer>

                        </QuestionContainer>
                    )}


            </GameArea>
        </MainContainer>
    );
};

export default SelectOption;

const GridPlacer = styled.div`
  display: grid;
  grid-template-columns: 8vw;
  grid-row: auto auto;
  align-items: center;
  justify-content: center;
`;

const AgridPlacer = styled.div`
  display: grid;
  grid-template-columns: 8vw 8vw;
  grid-row: auto auto;
  align-items: center;
  justify-content: center;
`;


const QuestionContainer = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
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
`;
