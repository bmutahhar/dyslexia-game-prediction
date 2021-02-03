import React, { Component } from "react";
import { Avatarcard } from "../Components";

import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import larka from "../Images/characters/larka2.svg";
import larki from "../Images/characters/larki2.svg";



export default class Avatar extends Component {
    render() {
        return <Avatarselect />;
    }
}

const Avatarselect = () => {


    return (
        <Backdisplay>
            <Avatarcard name="Ahmed"
                avatarimg={larka}
                avatarcolor="linear-gradient(to top right, #0362fc, #03adfc)"
                cardborder="5px solid #025ae8"
                cardmargin="0 3.5rem 0 0"
                buttoncolor="#03adfc"
                buttonborder="4px solid #03adfc"
                buttoncolorh="#0362fc"
                buttonshadow="0px 8px 7px rgba(3, 173, 252, 0.8)"></Avatarcard>
            <Headerdiv>
                <Header>Select Your Avatar</Header>

            </Headerdiv>
            <Avatarcard name="Bismah"
                avatarimg={larki}
                avatarcolor="linear-gradient(to top right, #e33ba8, #fc03f4)"
                cardborder="5px solid #e33ba8"
                cardmargin="0 0 0 3.5rem"

                buttoncolor=" #fc03f4"
                buttonborder="4px solid #ff5cf4"
                buttoncolorh="##e33ba8"
                buttonshadow="0px 8px 7px rgba(252, 3, 244, 0.8)"></Avatarcard>

        </Backdisplay>

    );

};

const fadeAnimation = keyframes`${fadeIn}`;

const Headerdiv = styled.div`
width: 20%;
height: 25%;
text-align: center;
padding-top: 2rem;
border-radius: 8px;
box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
background-color: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(10px);
animation: 2s ${fadeAnimation};
&: hover {
    cursor: default;
}

`;
const Header = styled.h1`
font-family: 'Bebas Neue', cursive;
letter-spacing:3px;
color: #faf6f3;
font-size: 3.2vw;
`;
const Backdisplay = styled.div`
background: linear-gradient(to right, #03adfc, #fc03f4);
display: flex;
flex-direction: row;
height: 100vh;
margin: 0;
justify-content: center;
align-items: center;
width: 100%;

`;