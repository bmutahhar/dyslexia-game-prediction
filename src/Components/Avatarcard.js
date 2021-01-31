
import React, { Component } from "react";
import {useHistory} from "react-router-dom"
import styled, { keyframes } from "styled-components";
import { zoomIn, fadeIn } from "react-animations";




export default class Avatarcard extends Component {
    render() {
        return <AvatarCard name={this.props.name}
            avatarimg={this.props.avatarimg}
            avatarcolor={this.props.avatarcolor}
            cardborder={this.props.cardborder}
            cardmargin={this.props.cardmargin}
            buttoncolor={this.props.buttoncolor}
            buttoncolorh={this.props.buttoncolorh}
            buttonshadow={this.props.buttonshadow}
            buttonborder={this.props.buttonborder} />;

    }
}
function AvatarCard(props) {

    const history = useHistory();

    const nextPage = () => {
        history.push("/")
    }


    return (
        <Card className="card" cardborder={props.cardborder} cardmargin={props.cardmargin}>
            <Avatarback className="avatarb" avatarcolor={props.avatarcolor}>
                <Avatar className="avatarimg" src={props.avatarimg} alt="avatar">

                </Avatar>
            </Avatarback>
            <Avatarname>{props.name}</Avatarname>
            <Selectbutton buttonborder={props.buttonborder}
                buttoncolor={props.buttoncolor}
                buttoncolorh={props.buttoncolorh}
                buttonshadow={props.buttonshadow}
                onClick={nextPage}
                >Select Me</Selectbutton>
        </Card>
    );
};

const zoomAnimation = keyframes`${zoomIn}`;
const fadeAnimation = keyframes`${fadeIn}`;

const Card = styled.div`
margin: ${(props) => {
        return `${props.cardmargin}`;

    }};
background-color: white;
  height: 90vh;
  width: 28%;
  border-radius: 30px;
  padding: 1rem 5rem;
  box-shadow: 0 20px 10px rgba(0, 0, 0, 0.2), 0px 0px 30px rgba(0, 0, 0, 0.2);
border: ${(props) => {
        return `${props.cardborder}`;

    }};
    transition: 0.3s ease-in-out;
    animation:  2s  -0.2s ${zoomAnimation};

&: hover {
    height: 93vh;
    width: 29%;

}
`;
const Avatarback = styled.div`
margin-top: 1.5rem;
background: ${(props) => {
        return `${props.avatarcolor}`;

    }};
position: absolute;
width: 80%;
height: 60%;
left: 9.5%;
top: 5%;
border-radius: 20px;
animation:  2.5s ${fadeAnimation};




`;
const Avatar = styled.img`
height: 122%;
position: absolute;
left: 23%;
top: -12%;
animation:  2.7s ${zoomAnimation};
transition: 0.3s ease-in-out;
transform : perspective(500px) translateZ(0px);


&:hover {
 transform : perspective(500px) translateZ(50px);
}




`;
const Avatarname = styled.h3`
font-size: 2.5vw;
position: absolute;
bottom: 17%;
left: 37%;
`;
const Selectbutton = styled.button`
position: absolute;
bottom: 3%;
left: 26%;
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

transition: 0.2s ;
  
  &:hover {
      border : ${(props) => {
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
`;