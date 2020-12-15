import React, { Component } from "react";
import Cards from "../../Components/Cards";

import styled, { keyframes } from "styled-components";

import lion from "../Images/Characters/lion.png";
import kangaroo from "../Images/Characters/kangaroo.png";
import bird from "../Images/Characters/eagle.png";
import image from "../../Components/Images/second.png";

import Background from "../../Components/Background";



export default class level extends Component {
    render() {
        return <Levelselect />;
    }
}

const Levelselect = () => {


    return (
        <Backdisplay

        >
            <Cards circles={styles.circle} level="PRE-SCHOOL LEVEL" description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 2-4"
                image={bird} />
            <Cards circles={styles.circle1} level="LEARNER LEVEL" description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 5-7"
                image={lion} />
            <Cards circles={styles.circle2} level="ELEMENTARY LEVEL" description="THIS LEVEL IS FOR CHILDREN BETWEEN THE AGE OF 7-10"
                image={kangaroo} />
        </Backdisplay>
    );
};

const Backdisplay = styled.div`
background-image: linear-gradient(to right, blue, black);
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
    }
}