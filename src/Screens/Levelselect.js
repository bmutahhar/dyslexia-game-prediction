import React, { Component } from "react";
import { Cards } from "../Components";

import styled from "styled-components";

import lion from "../Images/characters/lion.png";
import kangaroo from "../Images/characters/kangaroo.png";
import bird from "../Images/characters/eagle.png";

export default class level extends Component {
  render() {
    return <Levelselect />;
  }
}

const Levelselect = () => {
  return (
    <Backdisplay>
      <Cards
        cardstate={true}
        moreinfostate={false}
        buttonshadow="0px 8px 7px rgba(4, 193, 240, 0.8)"
        buttonborder="3px solid #04c1f0"
        buttoncolorh="#067a96"
        buttoncolor="#04c1f0"
        cardcolor="5px solid #04c1f0"
        circles={styles.circle}
        level="PRE-SCHOOLER LEVEL"
        currentLevel="/preschooler"
        description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 3-5"
        descriptioninfo="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 3-5. THIS LEVEL WILL FOCUS ON THE CHILD'S MOTOR SKILLS AND MEMORY. THE QUESTIONS WILL CONSISTS OF SHAPES AND OBJECTS"
        moreinfoq1="SHAPE MATCHING/INVERTED SHAPES"
        moreinfoq2="OBJECT ROTATION TO MATCH THE GIVEN SHAPE"
        image={bird}
      />

      <Cards
        cardstate={true}
        moreinfostate={false}
        buttonshadow="0px 8px 7px rgba(2, 252, 127, 0.8)"
        buttonborder="3px solid #02fc7f"
        buttoncolorh="#08a154"
        buttoncolor="#02fc7f"
        cardcolor="5px solid #02fc7f"
        circles={styles.circle1}
        description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 6-9"
        level="LEARNER LEVEL"
        currentLevel="/learner"
        descriptioninfo="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 6-9. THIS LEVEL WILL FOCUS ON THE CHILD'S MOTOR SKILLS AS WELL AS LISTENING CAPABILITIES. THE QUESTIONS WILL CONSIST OF NUMBERS AND 2-3 LETTER WORDS "
        moreinfoq1="WRITTEN LETTER MATCHING"
        moreinfoq2="SOUND TO LETTER MATCHING"
        moreinfoq3="MISSING LETTER MATCHING BY USING DRAGABLE TILES TO CHECK MOTOR SKILLS"
        image={lion}
      />

      <Cards
        cardstate={true}
        moreinfostate={false}
        buttonshadow="0px 8px 7px rgba(255, 143, 5, 0.8)"
        buttonborder="3px solid #ff8f05"
        buttoncolorh="#c76b08"
        buttoncolor="#ff8f05"
        cardcolor="5px solid  #ff8f05"
        circles={styles.circle2}
        level="ELEMENTARY LEVEL"
        currentLevel="/elementary"
        description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 9-12"
        descriptioninfo="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 9-12.  THIS LEVEL WILL FOCUS ON THE CHILD'S MOTOR SKILLS, LISTENING CAPABILITIES AND PUZZLE SOLVING CAPABILITIES. THE QUESTIONS WILL ALSO CONSIST OF PSUEDO WORDS AND SMALL PUZZLES"
        moreinfoq1="COMPLETE SOUND TO WORD MATCHING, 4 TO 5 LETTER WORDS"
        moreinfoq2="PSEUDO WORD SOUND MATCHING"
        moreinfoq3="PUZZLE SOLVING BY REARRANGING TILES"
        image={kangaroo}
      />
    </Backdisplay>
  );
};

const Backdisplay = styled.div`
  background: linear-gradient(to right, #067a96, #08a154, #c76b08);
  display: flex;
  flex-direction: row;
  height: 100vh;
  margin: 0;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const styles = {
  circle: {
    width: "9rem",
    height: "9rem",
    backgroundImage: "linear-gradient(to right, #08539c,#04c1f0)",

    position: "absolute",
    borderRadius: "50%",
    zIndex: "1",
  },

  circle1: {
    width: "9rem",
    height: "9rem",
    backgroundImage: "linear-gradient(to right, #17ec04,#02fc7f)",

    position: "absolute",
    borderRadius: "50%",
    zIndex: "1",
  },

  circle2: {
    width: "9rem",
    height: "9rem",
    backgroundImage: "linear-gradient(to right, #e04b06,#ddf504)",

    position: "absolute",
    borderRadius: "50%",
    zIndex: "1",
  },
};
