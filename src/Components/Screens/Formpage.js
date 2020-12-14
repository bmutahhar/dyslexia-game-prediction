import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomIn, fadeIn } from "react-animations";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import bg from "../Images/bg.jpg";
import Character from "../Character";
import penguin1 from "../Images/Characters/penguin1.png";
import leapord from "../Images/Characters/leapord.png";
import polar from "../Images/Characters/polar.png";
import seal from "../Images/Characters/seal.png";
import penguin2 from "../Images/Characters/penguin2.png";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import { QandA } from "../FormpageData";
export default class Form extends Component {
  render() {
    return <Formpage />;
  }
}

const Formpage = () => {
  const active = "33px";
  const nonactive = "20px";
  const [verify, setVerify] = useState(false);
  const history = useHistory();

  const verifications = () => {
    setVerify(!verify);
  };

  const [answer1, setAnswer1] = useState("");
  const updateAnswer1 = (e) => {
    setAnswer1(e.target.value);


  };
  const [answer2, setAnswer2] = useState("");
  const updateAnswer2 = (e) => {
    setAnswer2(e.target.value);
  };
  const [answer3, setAnswer3] = useState("");
  const updateAnswer3 = (e) => {
    setAnswer3(e.target.value);
  };
  const [answer4, setAnswer4] = useState("");
  const updateAnswer4 = (e) => {
    setAnswer4(e.target.value);
  };
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    success: false,
    loading: false,
    open: false,
    alertMessage: "",
  });

  const [backdisabled, setBackDisabled] = useState(true);
  const [frontdisabled, setFrontDisabled] = useState(false);

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

  var menuitem1 = [
    <MenuItem value="" disabled>
      Select your answer
    </MenuItem>,
  ];
  var menuitem2 = [
    <MenuItem value="" disabled>
      Select your answer
    </MenuItem>,
  ];
  var menuitem3 = [
    <MenuItem value="" disabled>
      Select your answer
    </MenuItem>,
  ];
  var menuitem4 = [
    <MenuItem value="" disabled>
      Select your answer
    </MenuItem>,
  ];

  for (var i = 0; i < QA.q1options; i++) {
    menuitem1.push(
      <MenuItem value={q1arr[i]} style={styles.menuitem}>
        {q1arr[i]}
      </MenuItem>
    );
  }

  for (var i1 = 0; i1 < QA.q2options; i1++) {
    menuitem2.push(
      <MenuItem value={q2arr[i1]} style={styles.menuitem}>
        {q2arr[i1]}
      </MenuItem>
    );
  }

  for (var i2 = 0; i2 < QA.q3options; i2++) {
    menuitem3.push(
      <MenuItem value={q3arr[i2]} style={styles.menuitem}>
        {q3arr[i2]}
      </MenuItem>
    );
  }

  for (var i3 = 0; i3 < QA.q4options; i3++) {
    menuitem4.push(
      <MenuItem value={q4arr[i3]} style={styles.menuitem}>
        {q4arr[i3]}
      </MenuItem>
    );
  }
  const [consentf, setConsentf] = useState(true);
  const [questionf, setQuestionf] = useState(false);

  const Proceed = () => {
    setConsentf(false);
    setQuestionf(true);
    setVerify(false);

    navigation();
  };

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

  const addAnswers = () => {
    let tempAnswers = data;
    tempAnswers[index] = { question: QA.q1, answer: answer1 };
    tempAnswers[index + 1] = { question: QA.q2, answer: answer2 };
    tempAnswers[index + 2] = { question: QA.q3, answer: answer3 };
    tempAnswers[index + 3] = { question: QA.q4, answer: answer4 };
    setIndex(index + 4);
    setData(tempAnswers);
  };

  var counter = runs;
  const Forwardnavigate = () => {
    if (runs < 5) {
      counter = counter + 1;

      setRun(counter);
    } else {
      setRun(counter);
    }
    addAnswers();
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswer4("");
    navigation();
  };

  const Backwardnavigate = () => {
    if (runs > 1) {
      counter = counter - 1;
      setRun(counter);
    } else {
      setRun(counter);
    }
    setIndex(index - 4);
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
        setBackDisabled(true);
        setFrontDisabled(false);

        setQA({
          q1: QandA.qna1.Q,
          q1sf: QandA.qna1.fieldselect,
          q1if: QandA.qna1.fieldinput,

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
          q3opt4: QandA.qna3.A4,

          q4: QandA.qna4.Q,
          q4sf: QandA.qna4.fieldselect,
          q4if: QandA.qna4.fieldinput,
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
        setBackDisabled(false);
        setFrontDisabled(false);
        setQA({
          q1: QandA.qna5.Q,
          q1options: QandA.qna5.noofopt,
          q1sf: QandA.qna5.fieldselect,
          q1if: QandA.qna5.fieldinput,
          q1opt1: QandA.qna5.A1,
          q1opt2: QandA.qna5.A2,
          q1opt3: QandA.qna5.A3,
          q1opt4: QandA.qna5.A4,

          q2: QandA.qna6.Q,
          q2options: QandA.qna6.noofopt,
          q2sf: QandA.qna6.fieldselect,
          q2if: QandA.qna6.fieldinput,
          q2opt1: QandA.qna6.A1,
          q2opt2: QandA.qna6.A2,
          q2opt3: QandA.qna6.A3,
          q2opt4: QandA.qna6.A4,

          q3: QandA.qna7.Q,
          q3options: QandA.qna7.noofopt,
          q3sf: QandA.qna7.fieldselect,
          q3if: QandA.qna7.fieldinput,
          q3opt1: QandA.qna7.A1,
          q3opt2: QandA.qna7.A2,
          q3opt3: QandA.qna7.A3,
          q3opt4: QandA.qna7.A4,

          q4: QandA.qna8.Q,
          q4sf: QandA.qna4.fieldselect,
          q4if: QandA.qna4.fieldinput,
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
        setFrontDisabled(false);
        setQA({
          q1: QandA.qna9.Q,
          q1options: QandA.qna9.noofopt,
          q1sf: QandA.qna9.fieldselect,
          q1if: QandA.qna9.fieldinput,
          q1opt1: QandA.qna9.A1,
          q1opt2: QandA.qna9.A2,

          q2: QandA.qna10.Q,
          q2options: QandA.qna10.noofopt,
          q2sf: QandA.qna10.fieldselect,
          q2if: QandA.qna10.fieldinput,
          q2opt1: QandA.qna10.A1,
          q2opt2: QandA.qna10.A2,
          q2opt3: QandA.qna10.A3,

          q3: QandA.qna11.Q,
          q3sf: QandA.qna11.fieldselect,
          q3if: QandA.qna11.fieldinput,

          q4: QandA.qna12.Q,
          q4sf: QandA.qna12.fieldselect,
          q4if: QandA.qna12.fieldinput,
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
        setFrontDisabled(false);
        setQA({
          q1: QandA.qna13.Q,
          q1sf: QandA.qna13.fieldselect,
          q1if: QandA.qna13.fieldinput,

          q2: QandA.qna14.Q,
          q2sf: QandA.qna14.fieldselect,
          q2if: QandA.qna14.fieldinput,

          q3: QandA.qna15.Q,
          q3options: QandA.qna15.noofopt,

          q3sf: QandA.qna15.fieldselect,
          q3if: QandA.qna15.fieldinput,
          q3opt1: QandA.qna15.A1,
          q3opt2: QandA.qna15.A2,
          q3opt3: QandA.qna15.A3,
          q3opt4: QandA.qna15.A4,

          q4: QandA.qna16.Q,
          q4sf: QandA.qna16.fieldselect,
          q4if: QandA.qna16.fieldinput,
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
        setFrontDisabled(true);
        setQA({
          q1: QandA.qna17.Q,
          q1options: QandA.qna17.noofopt,
          q1sf: QandA.qna17.fieldselect,
          q1if: QandA.qna17.fieldinput,
          q1opt1: QandA.qna17.A1,
          q1opt2: QandA.qna17.A2,
          q1opt3: QandA.qna17.A3,
          q1opt4: QandA.qna17.A4,

          q2: QandA.qna18.Q,
          q2options: QandA.qna18.noofopt,
          q2sf: QandA.qna18.fieldselect,
          q2if: QandA.qna18.fieldinput,
          q2opt1: QandA.qna18.A1,
          q2opt2: QandA.qna18.A2,
          q2opt3: QandA.qna18.A3,

          q3: QandA.qna19.Q,
          q3sf: QandA.qna19.fieldselect,
          q3if: QandA.qna19.fieldinput,

          q4: "",
          q4sf: false,
          q4if: false,
        });

        break;
      }
    }
  };
  var arrowcolorb = "#21768d";
  var arrowcolorf = "#21768d";
  // eslint-disable-next-line no-lone-blocks
  {
    backdisabled && (
      arrowcolorb = "#5b6163"
    )
  }
  // eslint-disable-next-line no-lone-blocks
  {
    frontdisabled && (
      arrowcolorf = "#4d6166"
    )
  }
  const handleClose = () => {
    setStatus({ ...status, open: false });
  };

  const postData = (data) => {
    fetch("api/v1/userform/addData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((respJson) => {
        if (respJson.error.trim().length === 0) {
          console.log(respJson);
          setStatus({
            open: true,
            success: true,
            loading: false,
            alertMessage: "Information Registered Successfully",
          });
          setTimeout(() => history.push("/game/levels"), 1000)
        } else {
          console.log(respJson);
          setStatus({
            open: true,
            success: false,
            loading: false,
            alertMessage: respJson.error,
          });
        }
      })
      .catch((error) => {
        alert(error);
        setStatus({
          open: true,
          success: false,
          loading: false,
          alertMessage: error,
        });
      });
  };

  const onClick = () => {
    setStatus({ ...status, loading: true });
    addAnswers();
    postData(data);
  };

  return (
    <Container className="container-fluid">
      <Row className="row" style={styles.bgCOLOR}>
        <ColumnAni className="col-11 m-auto" style={styles.coll_11}>
          <Row className="row">
            <Column className="col-12" style={styles.questions}>
              {questionf && (
                <FormControl style={styles.formControl}>
                  <Question>{QA.q1}</Question>

                  {QA.q1sf && (
                    <Select
                      value={answer1}
                      displayEmpty
                      onChange={updateAnswer1}
                      input={<BootstrapInput />}
                    >
                      {menuitem1}
                    </Select>
                  )}

                  {QA.q1if && (
                    <InputTextField
                      variant="outlined"
                      placeholder="Enter your answer"
                      value={answer1}
                      onChange={updateAnswer1}
                      inputProps={{
                        style: {
                          padding: "15px 10px",
                        },
                      }}
                    />
                  )}

                  <Question>{QA.q2}</Question>
                  {QA.q2sf && (
                    <Select
                      value={answer2}
                      displayEmpty
                      onChange={updateAnswer2}
                      input={<BootstrapInput />}
                    >
                      {menuitem2}
                    </Select>
                  )}

                  {QA.q2if && (
                    <InputTextField
                      variant="outlined"
                      placeholder="Enter your answer"
                      value={answer2}
                      onChange={updateAnswer2}
                      inputProps={{
                        style: {
                          padding: "15px 10px",
                        },
                      }}
                    />
                  )}
                  <Question>{QA.q3}</Question>
                  {QA.q3sf && (
                    <Select
                      value={answer3}
                      displayEmpty
                      onChange={updateAnswer3}
                      input={<BootstrapInput />}
                    >
                      {menuitem3}
                    </Select>
                  )}

                  {QA.q3if && (
                    <InputTextField
                      variant="outlined"
                      placeholder="Enter your answer"
                      value={answer3}
                      onChange={updateAnswer3}
                      inputProps={{
                        style: {
                          padding: "15px 10px",
                        },
                      }}
                    />
                  )}
                  <Question>{QA.q4}</Question>
                  {QA.q4sf && (
                    <Select
                      value={answer4}
                      displayEmpty
                      onChange={updateAnswer4}
                      input={<BootstrapInput />}
                    >
                      {menuitem4}
                    </Select>
                  )}

                  {QA.q4if && (
                    <InputTextField
                      variant="outlined"
                      placeholder="Enter your answer"
                      value={answer4}
                      onChange={updateAnswer4}
                      inputProps={{
                        style: {
                          padding: "15px 10px",
                        },
                      }}
                    />
                  )}
                </FormControl>
              )}
              {consentf && (
                <ConsentForm>
                  <Heading>Consent Form:</Heading>
                  <Content>
                    The purpose of this study is to analyze how people with and
                    without Dyslexia perceive music and visual elements.
                  </Content>
                  <Heading>Procedure:</Heading>
                  <Content>
                    It is important that you play the game without interruptions
                    on a computer (desktop or laptop) If you agree to
                    participate, you will be asked to answer a few background
                    questions about the child that is going to play. The
                    questions will be about whether the child have been
                    diagnosed with dyslexia, metadata (e.g. age, sex) and the
                    language learning environment (e.g. mother tongue)
                  </Content>
                  <Heading>Participant Requirements:</Heading>
                  <Content>
                    Participation in this study is limited to individuals’ age 3
                    and older. Please use a device with wifi connection for
                    participating in this study. If possible use headphones
                    while playing. Make sure you put the sound level comfortable
                    for you to understand the audio. Please play the game
                    without interruption
                  </Content>
                  <Heading>Voluntary Participation:</Heading>
                  <Content>
                    Your participation in this research is voluntary, and you
                    may choose not to participate or discontinue participation
                    at any time during the study. Because the participant is
                    under the age of 18, a parent, guardian leader or teacher
                    will need to approve the participation in this study.you
                    must be accompanied throughout the entire game by a parent
                    or legal guardian. By entering your information below, you
                    agree that the above information has been explained to you
                    and all your current questions have been answered
                  </Content>
                </ConsentForm>
              )}
            </Column>
          </Row>
          <Row className="row">
            <Column className="col-6" style={styles.cartoon}>
              {questionf && (
                <Character
                  className="iceanimals"
                  src={cvalues.animal}
                  alt="iceanimals"
                  style={styles.iceanimals}
                  isAnimated={true}
                  animation="zoomIn"
                  transition="0.5s"
                />
              )}

              {consentf && (
                <FormControlLabel
                  style={styles.check}
                  onClick={verifications}
                  checked={verify}
                  control={<Checkbox color="primary" />}
                  label="I have read and accept the agreement form"
                />
              )}
            </Column>

            <Column className="col-6" style={styles.navigation}>
              {cvalues.submitbutton && (
                <Submitbutton type="submit" onClick={onClick}>
                  {status.loading ? (
                    <CircularProgress style={{ color: "white" }} size={30} />
                  ) : (
                      "Done"
                    )}
                </Submitbutton>
              )}

              {questionf && (
                <NavIcons>
                  {/* <FrontBackIcon> */}
                  <IconButton disabled={backdisabled}
                  >
                    <IoIosArrowBack
                      onClick={Backwardnavigate}
                      color={arrowcolorb}
                      size="58px"
                      style={styles.navicon}
                    />
                  </IconButton>

                  {/* </FrontBackIcon> */}
                  <BsCircleFill
                    color="#24bf4b"
                    size={cvalues.c1}
                    style={styles.circle}
                  />
                  <BsCircleFill
                    color="#096fd6"
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
                    color="#e1e817"
                    size={cvalues.c5}
                    style={styles.circle}
                  />
                  {/* <FrontBackIcon> */}
                  <IconButton disabled={frontdisabled}>
                    <IoIosArrowForward
                      onClick={Forwardnavigate}
                      color={arrowcolorf}
                      size="58px"
                      style={styles.navicon}
                    />
                  </IconButton>

                  {/* </FrontBackIcon> */}
                </NavIcons>
              )}

              {verify && (
                <Proceedbutton onClick={Proceed}>Proceed</Proceedbutton>
              )}
            </Column>
          </Row>
        </ColumnAni>
      </Row>
      <Snackbar
        open={status.open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={status.success ? "success" : "error"}
          onClose={handleClose}
        >
          {status.alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const zoomAnimation = keyframes`${zoomIn}`;
const fadeInAnimation = keyframes`${fadeIn}`;
const Heading = styled.h2`
  font-weight: bold;
  color: red;
  font-size: 2vw;
  animation: 1s ${fadeInAnimation};
`;
const Content = styled.p`
  font-weight: bold;
  font-size: 1.2vw;
  animation: 1s ${fadeInAnimation};
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
  font-weight: 600;
  font-size: 1.5vw;
  align-items: center;
  justify-content:center;
  align-content: center;

  background-color: #21768d;
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
    outline: none;
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
  font-weight: 600;
  font-size: 1.5vw;
  align-items: center;
  padding-left: 6%;
  background-color: #21768d;
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
    outline: none;
  }
  &: active {
    background-color: #175060;
    box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.8);

    transform: translateY(4px);
    outline: none;
  }
`;

// const FrontBackIcon = styled.div`
//   display: inline-block;
//   &:hover {
//     cursor: pointer;
//   }
// `;
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
  margin-top: 15px;
  margin-left: 2px;
  font-size: 1.4vw;
  font-weight: 500;
  transition: 2s;
`;
const Row = styled.div``;

const Column = styled.div``;
const ColumnAni = styled.div`
  animation: 1s ${zoomAnimation};
`;

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
    bottom: "20%",
    left: "7%",
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
    fontSize: "18px",
    textAlign: "left",
    borderRadius: "5px",
    // fontWeight: "bold",
    fontColor: "black",
    opacity: "0.9",
    paddingLeft: "3px",
    paddingRight: "3px",

    backgroundColor: "white",

    width: "100%",
    height: "13%",
    border: "1px solid black",

    "&:selectMenu": {
      backgroundColor: "blue",
    },
  },

  menuitem: {
    width: "100%",
    fontSize: "15px",
    fontWeight: "bold",
    fontColor: "black",
  },
  navicon: {
    transition: "0.3s",
  }
};



// const Iconb = withStyles({
//   root: {

//     "&:disabled": {
//       backgroundColor: "#90ab95",
//       color: "white",
//       border: "none",
//     },
//   },

// })(IconButton);

const InputTextField = withStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "2px",
    color: "black",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#21768d",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: "1px",
        borderColor: "#000",
        width: "100%",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#21768d",
      },
      "& .MuiOutlinedInput-input": {
        fontSize: "1.5vw",
      },
    },
  },
})(TextField);

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    width: "100%",
    height: "5vh",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid black",
    fontSize: "1.4vw",
    padding: "18px 10px 5px 10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.

    "&:focus": {
      borderRadius: 4,
      borderColor: "#21768d",
      border: "2px solid #21768d ",
      backgroundColor: "white",
    },

    "&:hover": {
      borderRadius: 4,
      borderColor: "#21768d",
    },
  },
}))(InputBase);
