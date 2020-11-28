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
import MenuItem from "@material-ui/core/MenuItem";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import { HashLink as Link } from "react-router-hash-link";

export default class Form extends Component {
  render() {
    return <Formpage />;
  }
}
const active = "30px";
const nonactive = "20px";

const Formpage = () => {
  const [runs, setRun] = useState(1);
  const [cvalues, setCvalues] = useState({
    c1: active,
    c2: nonactive,
    c3: nonactive,
    c4: nonactive,
    c5: nonactive,
    animal: penguin1,
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
              <Select>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
            </Column>
          </Row>
          <Row className="row">
            <Column className="col-6" style={styles.cartoon}>
              <Character
                className="iceanimals"
                src={cvalues.animal}
                alt="iceanimals"
                style={styles.iceanimals}
              />
            </Column>

            <Column className="col-6" style={styles.navigation}>
              {/* <h1>{runs}</h1> */}

              <NavIcons>
                <IoIosArrowBack
                  onClick={Backwardnavigate}
                  color="blue"
                  size="55px"
                  style={styles.navicon}
                />
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
                <IoIosArrowForward
                  onClick={Forwardnavigate}
                  color="blue"
                  size="55px"
                  style={styles.navicon}
                />
              </NavIcons>
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
  );
};

// const Select = styled.select`
// border: none;
// margin-top: 10px;
// width: 100%;
// height: 10%;

// `;

const NavIcons = styled.div`
  position: absolute;
  right: 2%;
  bottom: 10%;
`;

const Container = styled.div`
  height: 100vh;
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
    border: "3px solid blue",
  },

  navigation: {
    alignContent: "right",
    height: "20vh",
    borderRadius: "0 0 20px 0",
    border: "3px solid green",
  },

  iceanimals: {
    position: "absolute",
    zIndex: 1,
    pointerEvents: "none",
    height: "110%",

    bottom: "-7%",
    left: "0.3%",
  },

  circle: {
    marginLeft: "3px",
    marginRight: "3px",
  },

  // navicon: {

  //     "&:hover": {
  //         cursor: "pointer"
  //     },

  // },
};
