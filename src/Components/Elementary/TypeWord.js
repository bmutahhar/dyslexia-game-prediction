import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Player, UIButton, NextButton, AvatarMessage, BadgePopUp } from "../../Components";
import { motion } from "framer-motion";
import { Backdrop } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import larka from "../../Images/characters/larka2.svg";
import larki from "../../Images/characters/larki2.svg";


const TypeWord = ({
    activeStep,
    nextStep,
    word,
    question,
    options,
    showBadge,
    badge,
    openBadge,
    badgeName,
}) => {
    const totalLevels = useSelector((state) => state.questions.totalQuestions);
    const gender = useSelector((state) => state.gender);
    const dispatch = useDispatch();
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const classes = useStyles();


    if (showBadge) {
        return (
            <Backdrop className={classes.backdrop} open={showBadge}>
                <BadgePopUp src={badge} alt="Badge" badgeName={badgeName} />
            </Backdrop>
        );
    } else {
        return (
            <MainContainer>
                <AvatarMessage
                    className="col-2"
                    src={gender === "male" ? larka : larki}
                    alt={gender === "male" ? "Boy Avatar" : "Girl Avatar"}
                />
                <GameArea className="col-8">
                    <QuestionContainer className="row">
                        <InputTextField
                            variant="outlined"


                            inputProps={{
                                style: {
                                    padding: "15px 10px",
                                },
                            }}
                        />
                        <Qinfo>
                            Listen to the word and type it in the box above
                        </Qinfo>
                        <Player color="white" text={word} />

                    </QuestionContainer>
                    {/* <AnswerContainer className="row">
                        <Player color="white" text={word} />
                    </AnswerContainer> */}
                </GameArea>
                <NextButtonContainer className="col-2">
                    {activeStep === totalLevels - 1 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ type: "tween", duration: 1 }}
                        >
                            <UIButton
                                variant="contained"
                                type="button"
                                component={Link}
                                to="/completed"
                            >
                                Submit
              </UIButton>
                        </motion.div>
                    ) : (
                        <NextButton
                            onClick={() => {
                                if ((activeStep + 1) % 2 === 0) openBadge();
                                nextStep();
                            }}
                        />
                    )}
                </NextButtonContainer>
            </MainContainer>
        );
    }
};

export default TypeWord;




const QuestionContainer = styled.div`
  margin-top: -30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const AnswerContainer = styled.div`
//   display: flex;
//   height: 20%;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border: 2px solid red;
// `;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Qinfo = styled(motion.h5)`
  margin-top: 30px;
  margin-bottom: 30px;
  color: white;
`;



const GameArea = styled.div`
  height: 100%;
  width: 100%;
`;

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 50px;
`;
const useStyles = makeStyles(({ theme }) => ({

    backdrop: {
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(18px)",
    },
}));

const InputTextField = withStyles({
    root: {
        backgroundColor: "#05e338",
        borderRadius: "15px",
        width: "50%",
        boxShadow: "2px 10px 40px rgba(0,0,0,0.3)",




        "&:hover .MuiOutlinedInput-notchedOutline": {
            boxShadow: "2px 10px 60px rgba(35,206,74,0.9)",
            transition: "0.3s ease-in-out",
            border: "1px solid white",

        },



        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderRadius: "15px",
                width: "100%",
                transition: "0.3s ease-in-out",



            },
            "&.Mui-focused fieldset": {
                border: "3px solid white",


            },
            "& .MuiOutlinedInput-input": {
                textAlign: "center",
                fontSize: "3.5vw",
                color: "white",
                letterSpacing: "10px",


            },
        },
    },

})(TextField);