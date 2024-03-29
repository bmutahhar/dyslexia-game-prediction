import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { zoomIn, fadeIn } from "react-animations";
import { setLevel } from "../actions";

export default class Cards extends Component {
  render() {
    return (
      <Card
        cardstate={this.props.cardstate}
        moreinfostate={this.props.moreinfostate}
        buttonshadow={this.props.buttonshadow}
        buttonborder={this.props.buttonborder}
        buttoncolorh={this.props.buttoncolorh}
        buttoncolor={this.props.buttoncolor}
        cardcolor={this.props.cardcolor}
        circles={this.props.circles}
        level={this.props.level}
        currentLevel={this.props.currentLevel}
        description={this.props.description}
        descriptioninfo={this.props.descriptioninfo}
        moreinfoq1={this.props.moreinfoq1}
        moreinfoq2={this.props.moreinfoq2}
        moreinfoq3={this.props.moreinfoq3}
        image={this.props.image}
      />
    );
  }
}
function Card(props) {
  const [displaycard, setDisplaycard] = useState(props.cardstate);
  const [displayinfo, setDisplayinfo] = useState(props.moreinfostate);
  const history = useHistory();
  const dispatch = useDispatch();

  const displaymoreinfo = () => {
    setDisplayinfo(!displayinfo);
    setDisplaycard(!displaycard);
  };

  const nextPage = () => {
    dispatch(setLevel(props.currentLevel));
    history.push("/selectAvatar");
  };
  const Animate = () => {
    const card = document.querySelectorAll(".card");

    const title = document.querySelectorAll(".title");

    const sneaker = document.querySelectorAll(".animal img");

    const purchase = document.querySelectorAll(".start");

    const description = document.querySelectorAll(".info h3");

    const sizes = document.querySelectorAll(".moreinfo");

    for (let i = 0; i <= 2; i++) {
      card[i].addEventListener("mousemove", (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 75;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 30;
        card[i].style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      });

      card[i].addEventListener("mouseenter", (e) => {
        card[i].style.transition = "none";

        title[i].style.transform = "translateZ(200px)";
        sneaker[i].style.transform = "translateZ(230px) rotateZ(-45deg)";
        description[i].style.transform = "translateZ(125px)";
        sizes[i].style.transform = "translateZ(100px)";
        purchase[i].style.transform = "translateZ(150px)";
      });

      card[i].addEventListener("mouseleave", (e) => {
        card[i].style.transition = "all 0.7s ease";
        card[i].style.transform = `rotateY(0deg) rotateX(0deg)`;

        title[i].style.transform = "translateZ(0px)";
        sneaker[i].style.transform = "translateZ(0px) rotateZ(0deg)";
        description[i].style.transform = "translateZ(0px)";
        sizes[i].style.transform = "translateZ(0px)";
        purchase[i].style.transform = "translateZ(0px)";
      });
    }
  };

  return (
    <Crd
      className="card wow"
      onLoad={Animate}
      style={{ border: props.cardcolor }}
    >
      {displaycard && (
        <>
          <Animal className="animal">
            <Circle style={props.circles}></Circle>
            <Animalimg src={props.image} alt="bird" />
          </Animal>
          <Info className="info">
            <Infoh1 className="title">{props.level}</Infoh1>
            <Infoh3>{props.description}</Infoh3>
          </Info>

          <Buttonstart
            className="start"
            buttoncolor={props.buttoncolor}
            buttoncolorh={props.buttoncolorh}
            buttonborder={props.buttonborder}
            buttonshadow={props.buttonshadow}
            onClick={nextPage}
          >
            START
          </Buttonstart>

          <Buttoninfo className="moreinfo" onClick={displaymoreinfo}>
            More-info
          </Buttoninfo>
        </>
      )}

      {displayinfo && (
        <Levelinfo buttoncolorh={props.buttoncolorh}>
          <Header>{props.level}</Header>
          <Subheader>{props.descriptioninfo}</Subheader>
          <Header>TYPES OF QUESTION:</Header>
          <ul>
            <Moreinfo>{props.moreinfoq1}</Moreinfo>
            <Moreinfo>{props.moreinfoq2}</Moreinfo>
            {props.moreinfoq3 !== undefined ? (
              <Moreinfo>{props.moreinfoq3}</Moreinfo>
            ) : (
              <></>
            )}
          </ul>
          <Buttonclose onClick={displaymoreinfo}>Close</Buttonclose>
        </Levelinfo>
      )}
    </Crd>
  );
}

const zoomAnimation = keyframes`${zoomIn}`;
const fadeAnimation = keyframes`${fadeIn}`;

const Circle = styled.div``;

const Levelinfo = styled.div`
  position: absolute;
  transform: none;

  background-color: ${(props) => {
    return `${props.buttoncolorh}`;
  }};
  height: 100%;
  width: 100%;
  bottom: 0%;
  left: 0.02%;
  border-radius: 25px;
  padding: 1rem 3rem;

  animation: 0.6s ${fadeAnimation};
`;
const Crd = styled.div`
  background-color: white;
  transform-style: preserve-3d;
  height: 90vh;
  width: 28%;
  border-radius: 30px;
  padding: 1rem 5rem;
  box-shadow: 0 20px 10px rgba(0, 0, 0, 0.2), 0px 0px 30px rgba(0, 0, 0, 0.2);
  animation: 2s -0.2s ${zoomAnimation};

  transition: 0.45s;
  &:hover {
  }
`;

const Animal = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Animalimg = styled.img`
  width: 8rem;
  z-index: 2;
  transition: all 0.75s ease-out;
`;

const Info = styled.div``;
const Infoh1 = styled.h1`
  margin-left: 0rem;
  margin-top: 2rem;
  font-size: 2vw;
  transition: all 0.75s ease-out;
  font-weight: bold;
  &:hover {
    cursor: default;
  }
`;

const Header = styled(Infoh1)`
  color: black;
  margin-left: 0rem;
  margin-top: 0.05rem;

  &:hover {
    cursor: default;
  }
`;

const Infoh3 = styled.h3`
  font-size: 1.5vw;
  padding: 2rem 0rem;
  margin-bottom: 0rem;
  color: #585858;
  font-weight: lighter;
  transition: all 0.75s ease-out;
  &:hover {
    cursor: default;
  }
`;

const Subheader = styled(Infoh3)`
  padding: 1rem 0rem;
  padding-left: 1rem;
  font-size: 1.25vw;
  color: black;
  text-align: left;
  text-justify: inter-word;
  &:hover {
    cursor: default;
  }
`;

const Moreinfo = styled.li`
  font-size: 1.17vw;
  font-weight: light;
  align-items: left;
  justify-content: left;
  text-align: left;
  color: black;
  text-align: left;
  text-justify: inter-word;
  &:hover {
    cursor: default;
  }
`;

const Buttonstart = styled.button`
  position: absolute;
  bottom: 18%;
  left: 25%;
  width: 50%;
  height: 8%;
  border: none;

  background-color: ${(props) => {
    return `${props.buttoncolor}`;
  }};
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  font-weight: bold;
  color: black;

  transition: 0.2s ease-in;

  &:hover {
    border: ${(props) => {
      return `${props.buttonborder}`;
    }};
    outline: none;

    cursor: pointer;
    background-color: ${(props) => {
      return `${props.buttoncolorh}`;
    }};
  }

  &: active {
    box-shadow: ${(props) => {
      return `${props.buttonshadow}`;
    }};

    outline: none;
  }
`;

const Buttoninfo = styled(Buttonstart)`
  bottom: 7%;
  width: 38%;
  left: 31.5%;
  background-color: grey;
  &:hover {
    background-color: #f04b22;
    border: none;
  }
`;

const Buttonclose = styled(Buttoninfo)`
  background-color: #f04b22;

  &:hover {
    cursor: pointer;
  }
`;
