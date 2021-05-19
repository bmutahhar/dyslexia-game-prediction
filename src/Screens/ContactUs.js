import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInUp, bounce, zoomIn, wobble, bounceInUp } from "react-animations";
import { GrLinkTop } from "react-icons/gr";
import { HashLink as Link } from "react-router-hash-link";
import { Background, Character, UIButton } from "../Components";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import image from "../Images/backgrounds/last.jpg";
import stone from "../Images/pagefooter/stonefooter.svg";
import kangaroo from "../Images/characters/kangaroo.png";
import koala from "../Images/characters/koala.png";

export default class ContactUs extends Component {
  render() {
    return <Contactuspage />;
  }
}

const Contactuspage = () => {
  const [koalaMessage, setkoalaMessage] = useState(false);
  const [kangarooMessage, setkangarooMessage] = useState(false);

  const [koalaAnimation, setKoalaAnimation] = useState(true);
  const [koalapopup, setKoalaPopup] = useState(true);

  const [kangarooAnimation, setKangarooAnimation] = useState(true);
  const [kangaroopopup, setKangarooPopup] = useState(true);

  const displaykoalaMessage = () => {
    setKoalaAnimation(!koalaAnimation);
    setKoalaPopup(false);
    setkoalaMessage(!koalaMessage);
  };
  const displaykangarooMessage = () => {
    setKangarooAnimation(!kangarooAnimation);
    setKangarooPopup(false);
    setkangarooMessage(!kangarooMessage);
  };

  return (
    <Background
      className="d-flex align-items-center justify-content-center flex-column"
      id="contact"
      customStyle={false}
      src={image}
      // style={{position:"fixed"}}
    >
      <TopMsg className="wow">
        <Heading>
          <Typography
            variant="subtitle1"
            style={{
              color: "white",

              fontSize: "2vw",
              marginTop: "-5px",
            }}
          >
            Data Request Form
          </Typography>
        </Heading>
        <DataRequestForm>
          <Question>Name:</Question>
          <InputTextField
            variant="outlined"
            placeholder="Enter your Name"
            inputProps={{
              style: {
                padding: "15px 10px",
              },
            }}
          />
          <Question>Email:</Question>
          <InputTextField
            variant="outlined"
            placeholder="Enter your Email"
            inputProps={{
              style: {
                padding: "15px 10px",
              },
            }}
          />
          <Question>Contact no:</Question>
          <InputTextField
            variant="outlined"
            placeholder="Enter your phone number"
            inputProps={{
              style: {
                padding: "15px 10px",
              },
            }}
          />
          <Question>Purpose:</Question>
          <InputTextField
            id="outlined-multiline-flexible"
            placeholder="Enter your Purpose for data request"
            multiline
            rowsMax={5}
            variant="outlined"
          />
          {/* <FormSubmit>Submit</FormSubmit> */}

          {/* <UIButton type="submit">Submit</UIButton> */}
        </DataRequestForm>
        <RequestFormButton>
          <FormSubmit>Submit</FormSubmit>
        </RequestFormButton>
      </TopMsg>

      {/* <BottomMsg className="d-flex align-items-center justify-content-center flex-column wow"></BottomMsg> */}

      {koalaMessage && (
        <KoalaMessage>
          <h3>Hello Kids, I'M Eaggie</h3>

          <p>Watch The Instructional Video To Learn How To Play The Game</p>
        </KoalaMessage>
      )}
      {kangarooMessage && (
        <KangarooMessage>
          <h3>HI, I'M SUNNY</h3>

          <p>I Hope You Kids Have A Bright And Wonderful Day. :)</p>
        </KangarooMessage>
      )}

      {koalapopup && (
        <KoalaPopup className="wow">
          <h6>Hey!</h6>
        </KoalaPopup>
      )}

      {kangaroopopup && (
        <KangarooPopup className="wow">
          <h6>Hey!</h6>
        </KangarooPopup>
      )}

      <Character
        className="koala wow"
        src={koala}
        alt="koala"
        onClick={displaykoalaMessage}
        style={styles.koala}
        isAnimated={koalaAnimation}
      />

      <Character
        className="kangaroo wow"
        src={kangaroo}
        alt="kangaroo"
        onClick={displaykangarooMessage}
        style={styles.kangaroo}
        isAnimated={kangarooAnimation}
      />

      <Character
        className="stone"
        src={stone}
        alt="stone"
        style={styles.stone}
        onerror={`this.src=${stone}`}
      />
      <Link smooth to="#home">
        <ToTop className="wow">
          <GrLinkTop color="black" size="42px" />
        </ToTop>
      </Link>
    </Background>
  );
};

const zoomAnimation = keyframes`${zoomInUp}`;
const bounce1 = keyframes`${bounce}`;
const zoomin = keyframes`${zoomIn}`;
const wobbleAnimation = keyframes`${wobble}`;
const bounce2 = keyframes`${bounceInUp}`;

const FormSubmit = styled.button`
  width: 20%;
  height: 60%;
  border-radius: 10px;
  background-color: #25ce4a;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 1.5vw;
  border: none;
  z-index: 10;
  &:hover {
    background-color: #027719;
  }
`;
const Heading = styled.div`
  width: 100%;
  height: 10%;
  align-items: center;
  text-align: center;
  margin-top: -10px;
`;

const DataRequestForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  text-align: left;
`;

const RequestFormButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 15%;
  align-items: center;
  justify-content: center;
`;
const Question = styled.h3`
  margin-top: 5px;
  font-size: 1.4vw;
  font-weight: 500;
  color: white;
`;

const TopMsg = styled.div`
  border: 2px solid #702302;
  background-color: #c44f1e;
  align-items: center;
  justify-content: center;
  border-radius: 30px;

  position: absolute;

  min-width: 10%;
  min-height: 5%;

  width: 64%;
  height: 86%;
  margin: 5px;
  padding: 20px;
  right: 17.5%;
  bottom: -295%;
  animation: 3s ${zoomin};
`;
const BottomMsg = styled.div`
  color: black;
  font-size: 18px;
  background-image: linear-gradient(to right, #80562d, #bb461a);
  align-items: center;
  text-align: left;
  justify-content: center;
  border-radius: 30px;
  border: 2px solid black;

  position: absolute;

  min-width: 10%;
  min-height: 5%;

  width: 64%;
  height: 10%;
  margin: 5px;
  padding: 20px;
  right: 17.5%;
  bottom: -297%;
  animation: 2s ${wobbleAnimation};
`;
const KangarooMessage = styled.div`
  color: black;
  font-size: 18px;
  background-color: #f19611;
  align-items: center;
  text-align: left;
  justify-content: center;
  border-radius: 30px;
  border: 5px solid #c2501e;

  position: absolute;

  min-width: 10%;
  min-height: 25%;

  width: 15%;
  height: 45%;

  margin: 5px;
  padding: 20px;
  right: 1%;
  bottom: -265%;
  animation: 0.6s ${zoomAnimation};
`;

const KangarooPopup = styled.div`
  color: black;

  background-color: #f19611;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #c2501e;
  position: absolute;
  min-width: 5%;
  min-height: 10%;
  width: 5%;
  height: 5%;
  margin: 5px;
  z-index: 3;
  padding-top: 20px;
  right: 4%;
  bottom: -269%;
  animation: 2s 1s 3 ${bounce1};
`;

const KoalaMessage = styled.div`
  color: black;
  font-size: 18px;
  background-color: #a7a8ac;
  align-items: center;
  text-align: left;
  justify-content: center;
  border-radius: 30px;
  border: 5px solid #494a4e;

  position: absolute;

  min-width: 10%;
  min-height: 25%;

  width: 15%;
  height: 45%;
  margin: 5px;
  padding: 20px;
  left: 1%;
  bottom: -265%;
  animation: 0.6s ${zoomAnimation};
`;

const KoalaPopup = styled.div`
  color: black;

  background-color: #a7a8ac;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #494a4e;
  position: absolute;
  min-width: 5%;
  min-height: 10%;
  width: 5%;
  height: 5%;
  margin: 5px;
  z-index: 3;
  padding-top: 20px;
  left: 3%;
  bottom: -267%;
  animation: 2s 1s 3 ${bounce1};
`;

const ToTop = styled.div`
  padding: 10px;
  border-radius: 50px;
  background-color: orange;
  border: 2px solid #bb461a;

  position: absolute;
  bottom: -290%;
  right: 2%;
  z-index: 3;
  animation: 1s ${bounce2};
`;

const styles = {
  kangaroo: {
    height: "40%",
    position: "absolute",
    bottom: "-299%",
    right: "4%",
    zIndex: 2,
  },

  koala: {
    height: "35%",
    position: "absolute",
    bottom: "-300%",
    left: "-2%",
    zIndex: 2,
  },

  stone: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    bottom: "-300%",
    right: 0,
    left: 0,
  },
};

const InputTextField = withStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "2px",
    color: "black",

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: "1px",
        borderColor: "#000",
        width: "100%",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
      "& .MuiOutlinedInput-input": {
        fontSize: "1.2vw",
      },
    },
  },
})(TextField);
