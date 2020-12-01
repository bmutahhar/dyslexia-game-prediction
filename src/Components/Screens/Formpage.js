import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInUp, zoomInDown, bounce, zoomIn } from "react-animations";
import { Dropdown } from "semantic-ui-react";
import bg from "../Images/bg.jpg";
import Character from "../Character";
import penguin1 from "../Images/Characters/penguin1.png";
import leapord from "../Images/Characters/leapord.png";
import polar from "../Images/Characters/polar.png";
import seal from "../Images/Characters/seal.png";
import penguin2 from "../Images/Characters/penguin2.png";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import { HashLink as Link } from "react-router-hash-link";

export default class Form extends Component {
    render() {
        return <Formpage />;
    }
}


const Formpage = () => {
    const active = "33px";
    const nonactive = "20px";
    const [answer1, setAnswer1] = useState("");
    const updateAnswer1 = (e) => {
        setAnswer1(e.target.value);
    }
    const [answer2, setAnswer2] = useState("");
    const updateAnswer2 = (e) => {
        setAnswer2(e.target.value);
    }
    const [answer3, setAnswer3] = useState("");
    const updateAnswer3 = (e) => {
        setAnswer3(e.target.value);
    }
    const [answer4, setAnswer4] = useState("");
    const updateAnswer4 = (e) => {
        setAnswer4(e.target.value);
    }
    const [QA, setQA] = useState({
        q1: "",
        q1options: 0,
        q1sf: false,
        q1if: false,
        q1opt1: "",
        q1opt2: "",
        q1opt3: "",
        q1opt4: "",
        q2: "",
        q2options: 0,
        q2sf: false,
        q2if: false,
        q2opt1: "",
        q2opt2: "",
        q2opt3: "",
        q2opt4: "",
        q3: "",
        q3options: 0,
        q3sf: false,
        q3if: false,
        q3opt1: "",
        q3opt2: "",
        q3opt3: "",
        q3opt4: "",
        q4: "",
        q4options: 0,
        q4sf: false,
        q4if: false,
        q4opt1: "",
        q4opt2: "",
        q4opt3: "",
        q4opt4: "",
    });

    var q1arr = [QA.q1opt1, QA.q1opt2, QA.q1opt3, QA.q1opt4];
    var q2arr = [QA.q2opt1, QA.q2opt2, QA.q2opt3, QA.q2opt4];
    var q3arr = [QA.q3opt1, QA.q3opt2, QA.q3opt3, QA.q3opt4];
    var q4arr = [QA.q4opt1, QA.q4opt2, QA.q4opt3, QA.q4opt4];

    var menuitem1 = [<MenuItem value="" disabled>select your answer</MenuItem>];
    var menuitem2 = [<MenuItem value="" disabled>select your answer</MenuItem>];
    var menuitem3 = [<MenuItem value="" disabled>select your answer</MenuItem>];
    var menuitem4 = [<MenuItem value="" disabled>select your answer</MenuItem>];

    for (var i = 0; i < QA.q1options; i++) {
        menuitem1.push(<MenuItem value={q1arr[i]} style={styles.menuitem}>{q1arr[i]}</MenuItem>)
    }

    for (var i1 = 0; i1 < QA.q2options; i1++) {
        menuitem2.push(<MenuItem value={q2arr[i1]} style={styles.menuitem}>{q2arr[i1]}</MenuItem>)
    }

    for (var i2 = 0; i2 < QA.q3options; i2++) {
        menuitem3.push(<MenuItem value={q3arr[i2]} style={styles.menuitem}>{q3arr[i2]}</MenuItem>)
    }

    for (var i3 = 0; i3 < QA.q4options; i3++) {
        menuitem4.push(<MenuItem value={q4arr[i3]} style={styles.menuitem}>{q4arr[i3]}</MenuItem>)
    }
    const [consentf, setConsentf] = useState(true);
    const [questionf, setQuestionf] = useState(false);

    const Proceed = () => {
        setConsentf(false);
        setQuestionf(true);

        navigation();
    }
    const [runs, setRun] = useState(1);
    const [cvalues, setCvalues] = useState({
        c1: "",
        c2: "",
        c3: "",
        c4: "",
        c5: "",
        animal: "",
        submitbutton: false,
    });

    var counter = runs;
    const Forwardnavigate = () => {
        if (runs < 5) {
            counter = counter + 1;

            setRun(counter);
        } else {
            setRun(counter);
        }

        navigation();
    };

    const Backwardnavigate = () => {
        if (runs > 1) {
            counter = counter - 1;
            setRun(counter);
        } else {
            setRun(counter);
        }
        navigation();
    };

    const navigation = () => {
        switch (counter) {
            default:
                break;

            case 1: {
                setCvalues({
                    c1: active,
                    c2: nonactive,
                    c3: nonactive,
                    c4: nonactive,
                    c5: nonactive,
                    animal: penguin1,
                });
                setQA({
                    q1: QandA.qna1.Q,
                    q1options: QandA.qna1.noofopt,
                    q1sf: QandA.qna1.fieldselect,
                    q1if: QandA.qna1.fieldinput,
                    q1opt1: QandA.qna1.A1,
                    q1opt2: QandA.qna1.A2,
                    q1opt3: QandA.qna1.A3,

                    q2: QandA.qna2.Q,
                    q2options: QandA.qna2.noofopt,
                    q2sf: QandA.qna2.fieldselect,
                    q2if: QandA.qna2.fieldinput,
                    q2opt1: QandA.qna2.A1,
                    q2opt2: QandA.qna2.A2,

                    q3: QandA.qna3.Q,
                    q3options: QandA.qna3.noofopt,
                    q3sf: QandA.qna3.fieldselect,
                    q3if: QandA.qna3.fieldinput,
                    q3opt1: QandA.qna3.A1,
                    q3opt2: QandA.qna3.A2,
                    q3opt3: QandA.qna3.A3,

                    q4: QandA.qna4.Q,
                    q4options: QandA.qna4.noofopt,
                    q4sf: QandA.qna4.fieldselect,
                    q4if: QandA.qna4.fieldinput,
                    q4opt1: QandA.qna4.A1,
                    q4opt2: QandA.qna4.A2,

                });

                break;
            }

            case 2: {
                setCvalues({
                    c1: nonactive,
                    c2: active,
                    c3: nonactive,
                    c4: nonactive,
                    c5: nonactive,
                    animal: leapord,
                });

                setQA({

                    q1: "",
                    q1options: 0,
                    q1opt1: "",
                    q1opt2: "",
                    q1opt3: "",
                    q1opt4: "",
                    q2: "",
                    q2options: 0,
                    q2opt1: "",
                    q2opt2: "",
                    q2opt3: "",
                    q2opt4: "",
                    q3: "",
                    q3options: 0,
                    q3opt1: "",
                    q3opt2: "",
                    q3opt3: "",
                    q3opt4: "",
                    q4: "",
                    q4options: 0,
                    q4opt1: "",
                    q4opt2: "",
                    q4opt3: "",
                    q4opt4: "",
                });

                break;
            }

            case 3: {
                setCvalues({
                    c1: nonactive,
                    c2: nonactive,
                    c3: active,
                    c4: nonactive,
                    c5: nonactive,
                    animal: polar,
                });

                break;
            }

            case 4: {
                setCvalues({
                    c1: nonactive,
                    c2: nonactive,
                    c3: nonactive,
                    c4: active,
                    c5: nonactive,
                    animal: seal,
                });

                break;
            }

            case 5: {
                setCvalues({
                    c1: nonactive,
                    c2: nonactive,
                    c3: nonactive,
                    c4: nonactive,
                    c5: active,
                    animal: penguin2,
                    submitbutton: true,
                });

                break;
            }
        }
    };

    return (
        <Container className="container-fluid">
            <Row className="row" style={styles.bgCOLOR}>
                <Column className="col-11 m-auto" style={styles.coll_11}>
                    <Row className="row">
                        <Column className="col-12" style={styles.questions}>
                            {questionf && (
                                <FormControl style={styles.formControl}>
                                    <Question>{QA.q1}</Question>

                                    {QA.q1sf && (
                                        <Select value={answer1}
                                            displayEmpty
                                            onChange={updateAnswer1}
                                            style={styles.select}>

                                            {menuitem1}


                                        </Select>
                                    )}

                                    {QA.q1if && (

                                        <TextField placeholder="enter your answer" id="outlined-basic" variant="outlined" style={styles.select} />

                                    )}

                                    <Question>{QA.q2}</Question>
                                    {QA.q2sf && (
                                        <Select value={answer2}
                                            displayEmpty
                                            onChange={updateAnswer2}
                                            style={styles.select}>

                                            {menuitem2}


                                        </Select>
                                    )}

                                    {QA.q2if && (

                                        <TextField id="outlined-basic" placeholder="enter your answer" variant="outlined" style={styles.select} />

                                    )}
                                    <Question>{QA.q3}</Question>
                                    {QA.q3sf && (
                                        <Select value={answer3}
                                            displayEmpty
                                            onChange={updateAnswer3}
                                            style={styles.select}>

                                            {menuitem3}


                                        </Select>
                                    )}

                                    {QA.q3if && (

                                        <TextField id="outlined-basic" placeholder="enter your answer" variant="outlined" style={styles.select} />

                                    )}
                                    <Question>{QA.q4}</Question>
                                    {QA.q4sf && (
                                        <Select value={answer4}
                                            displayEmpty
                                            onChange={updateAnswer4}
                                            style={styles.select}>

                                            {menuitem4}


                                        </Select>
                                    )}

                                    {QA.q4if && (

                                        <TextField id="outlined-basic" placeholder="enter your answer" variant="outlined" style={styles.select} />

                                    )}
                                </FormControl>
                            )}
                            {consentf && (
                                <ConsentForm>
                                    <Heading>Consent Form:</Heading>
                                    <Content>The purpose of this study is to analyze how people with and without Dyslexia perceive music and visual elements.</Content>
                                    <Heading>Procedure:</Heading>
                                    <Content>It is important that you play the game without interruptions on a computer (desktop or laptop)
                                If you agree to participate, you will be asked to answer a few background questions about the child that is going to play. The questions will be about whether the child have been diagnosed with dyslexia, metadata (e.g. age, sex) and the language learning environment (e.g. mother tongue)</Content>
                                    <Heading>Participant Requirements:</Heading>
                                    <Content>Participation in this study is limited to individuals’ age 3 and older. Please use a device with wifi connection for participating in this study. If possible use headphones while playing. Make sure you put the sound level comfortable for you to understand the audio. Please play the game without interruption</Content>
                                    <Heading>Voluntary Participation:</Heading>
                                    <Content>Your participation in this research is voluntary, and you may choose not to participate or discontinue participation at any time during the study. Because the participant is under the age of 18, a parent, guardian leader or teacher will need to approve the participation in this study.you must be accompanied throughout the entire game by a parent or legal guardian. By entering your information below, you agree that the above information has been explained to you and all your current questions have been answered</Content>

                                </ConsentForm>
                            )}
                        </Column>
                    </Row>
                    <Row className="row">
                        <Column className="col-6" style={styles.cartoon}>
                            {questionf && (
                                <Character
                                    className="iceanimals "
                                    src={cvalues.animal}
                                    alt="iceanimals"
                                    style={styles.iceanimals}
                                />

                            )}

                            {consentf && (

                                <FormControlLabel
                                    style={styles.check}
                                    control={
                                        <Checkbox

                                            color="primary"
                                        />
                                    }
                                    label="i have read and accept the agreement form"
                                />
                            )}




                        </Column>

                        <Column className="col-6" style={styles.navigation}>



                            {cvalues.submitbutton && (
                                <Submitbutton>DONE</Submitbutton>
                            )}

                            {questionf && (


                                <NavIcons>
                                    <FrontBackIcon>
                                        <IoIosArrowBack
                                            onClick={Backwardnavigate}
                                            color="blue"
                                            size="58px"
                                            style={styles.navicon}
                                        />
                                    </FrontBackIcon>
                                    <BsCircleFill
                                        color="#0AC811"
                                        size={cvalues.c1}
                                        style={styles.circle}
                                    />
                                    <BsCircleFill
                                        color="#0A41F5"
                                        size={cvalues.c2}
                                        style={styles.circle}
                                    />
                                    <BsCircleFill
                                        color="#0BCECE"
                                        size={cvalues.c3}
                                        style={styles.circle}
                                    />
                                    <BsCircleFill
                                        color="#FF8000"
                                        size={cvalues.c4}
                                        style={styles.circle}
                                    />
                                    <BsCircleFill
                                        color="#EFF60F"
                                        size={cvalues.c5}
                                        style={styles.circle}
                                    />
                                    <FrontBackIcon>
                                        <IoIosArrowForward
                                            onClick={Forwardnavigate}
                                            color="blue"
                                            size="58px"
                                            style={styles.navicon}
                                        />
                                    </FrontBackIcon>

                                </NavIcons>

                            )}

                            {consentf && (

                                <Proceedbutton onClick={Proceed}>Proceed</Proceedbutton>
                            )}
                        </Column>
                    </Row>
                </Column>
            </Row>
        </Container>
    );
};

const zoomAnimation = keyframes`${zoomIn}`;

const Heading = styled.h2`
font-weight: bold;
color: red;
`;
const Content = styled.p`
font-weight: bold;

`;
const ConsentForm = styled.div`
margin-top: 8px;
align-items: left;
justify-content: center;
`;
const Submitbutton = styled.button`
display: flex;
position: absolute;
bottom: 20%;
width: 25%;
height: 40%;
font-weight: bold;
font-size: 2vw;
align-items: center;
padding-left: 6%;

background-color: #21768D;
color: white;
border: none;
margin-left: -18%;
border-radius: 12px;
box-shadow: 0 10px 6px 0 rgba(0, 0, 0, 0.4);
outline: none;
transition: 0.2s;
animation: 1s ${zoomAnimation};


&:hover {
    background-color: #175060;
    
}
&: focus {
    outline:none;
}
&: active {

    background-color: #175060;
    box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.8);

    transform: translateY(4px);
    outline: none;

}



`;

const Proceedbutton = styled.button`
display: flex;
position: absolute;
bottom: 20%;
width: 25%;
height: 40%;
font-weight: bold;
font-size: 2vw;
align-items: center;
padding-left: 4%;
background-color: #21768D;
color: white;
border: none;
right: 3%;
border-radius: 12px;
box-shadow: 0 10px 6px 0 rgba(0, 0, 0, 0.4);
outline: none;
transition: 0.2s;
animation: 1s ${zoomAnimation};


&:hover {
    background-color: #175060;
    
}
&: focus {
    outline:none;
}
&: active {

    background-color: #175060;
    box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.8);

    transform: translateY(4px);
    outline: none;

}



`;

const FrontBackIcon = styled.div`
display: inline-block;
&:hover {
    cursor: pointer;}
    
`;
const NavIcons = styled.div`
  position: absolute;
  right: 5%;
  bottom: 10%;
`;

// const Container = styled.div`
//   height: 100vh;
// `;

const Container = styled.div`
  height: 100vh;
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  
 -ms-user-select: none;
  user-select: none;

  
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  
  &::selection {
    background-color: transparent;
  }
  &::-moz-selection {
    background-color: transparent;
  }
`;

const Question = styled.h3`
margin-top: 12px;
`;
const Row = styled.div``;

const Column = styled.div``;

const styles = {
    bgCOLOR: {
        backgroundColor: "#21768d",
        height: "100vh",
    },

    coll_11: {
        backgroundImage: "url(" + bg + ")",
        height: "90vh",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "20px",
        boxShadow: "5px 15px 8px rgba(0,0,0,0.4)",
    },

    questions: {
        textAlign: "left",
        height: "70vh",
        borderRadius: "20px 20px 0 0",
        // border: "3px solid red"
    },

    cartoon: {
        height: "20vh",
        borderRadius: "0 0 0 20px",
        // border: "3px solid blue",
    },

    navigation: {
        alignContent: "right",
        height: "20vh",
        borderRadius: "0 0 20px 0",
        // border: "3px solid green",
    },

    iceanimals: {
        position: "absolute",
        zIndex: 1,

        height: "110%",

        bottom: "-6%",
        left: "0.3%",

    },

    check: {

        position: "absolute",
        bottom: "15%",
        left: "5%",
    },

    circle: {
        marginLeft: "3px",
        marginRight: "3px",
        transition: "0.2s",
        transitionTimingFunction: "ease-in-out",
    },

    formControl: {
        marginLeft: "25px",
        marginRight: "5px",

        width: "95%",
        height: "70vh",
        borderRadius: "20px 20px 0 0",



    },

    select: {
        fontSize: "14px",
        textAlign: "center",
        borderRadius: "5px",
        fontWeight: "bold",
        fontColor: "black",
        opacity: "0.9",
        // paddingLeft: "3px",
        // paddingRight: "3px",

        backgroundColor: "white",

        width: "100%",
        height: "13%",
        border: "1px solid black",

        '&:selectMenu': {
            backgroundColor: "blue",
        }

    },

    menuitem: {

        width: "100%",
        fontSize: "15px",
        fontWeight: "bold",
        fontColor: "black",



    },


};

const QandA = {

    qna1: { Q: 'is mutahar noob?', A1: 'yes', A2: 'no', A3: 'OFFCOURSE', noofopt: 3, fieldselect: true, fieldinput: false },
    qna2: { Q: 'is mutahar sexy?', A1: 'yes', A2: 'no', noofopt: 2, fieldselect: true, fieldinput: false },
    qna3: { Q: 'is mutahar smart?', A1: 'yes', A2: 'is that a question', A3: 'OFFCOURSE', noofopt: 3, fieldselect: false, fieldinput: true },
    qna4: { Q: 'is mutahar?', A1: 'yes he is', A2: 'no he is not', noofopt: 2, field: 'select', fieldselect: false, fieldinput: true }
}