import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";
import { zoomInUp, bounce } from "react-animations";
import { useMediaQuery } from "react-responsive";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import image from "../Images/backgrounds/profilebg.png";
import upload from "../Images/backgrounds/photo.svg";
import remove from "../Images/backgrounds/eraser.svg";
import edit from "../Images/backgrounds/pencil.svg";
import dp from "../Images/backgrounds/Mask Group 21.png";




export default class Profile extends Component {
    render() {
        return <ProfileTracking />;
    }
}


const ProfileTracking = () => {

    const [editinfo, setEditinfo] = useState(true);

    const SetReadState = () => {
        setEditinfo(false);
    }


    return (
        <Background className="container-fluid" background={image}>

            <ProfileInfo className="row">
                <Profileimg className="col-4">

                    <ImgDisplay>
                        <Dpic src={dp} alt="image" />
                    </ImgDisplay>
                    <SetButtons>
                        <Selectimg><Icon iconimg={upload}></Icon> upload</Selectimg>
                        <Deleteimg><Icon iconimg={remove}></Icon> upload</Deleteimg>
                    </SetButtons>

                </Profileimg>
                <ProfileDetails className="col-8">
                    <Row1 className="row">
                        <Col1 className="col-6">
                            <InputTextField
                                id="outlined-basic" label="Username"
                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>
                        <Col1 className="col-6">
                            <InputTextField
                                id="outlined-basic" label="Password"

                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>

                    </Row1>
                    <Row1 className="row">
                        <Col1 className="col-6">
                            <InputTextField
                                id="outlined-basic" label="Parent's Name"

                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>
                        <Col1 className="col-6">
                            <InputTextField
                                id="outlined-basic" label="Child's Name"

                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>
                    </Row1>
                    <Row1 className="row">
                        <Col1 className="col-3">
                            <InputTextField
                                id="outlined-basic" label="Age"

                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>
                        <Col1 className="col-3">
                            <InputTextField
                                id="outlined-basic" label="Gender"

                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>
                        <Col1 className="col-6">
                            <InputTextField
                                id="outlined-basic" label="Email"

                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>

                    </Row1>
                    <Row1 className="row">
                        <Col1 className="col-5">
                            <InputTextField
                                id="outlined-basic" label="Country"

                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>
                        <Col1 className="col-5">
                            <InputTextField
                                id="outlined-basic" label="City"

                                variant="outlined"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: editinfo,
                                }} />
                        </Col1>
                        <Col1 className="col-2">
                            <Editinfo onClick={SetReadState}> Edit <Icon iconimg={edit}></Icon></Editinfo>

                        </Col1>
                    </Row1>
                </ProfileDetails>
            </ProfileInfo>
            <Title className="row">
                <h1>Child's Performance</h1>

            </Title>
            <GamePerformance className="row">
                <ChartContainer>
                    <ChartButton>
                        <NavButton>Scoreboards</NavButton>
                        <NavButton>Dyslexic Prediction</NavButton>
                        <NavButton>Improvement Graph</NavButton>


                    </ChartButton>
                    <ChartGraphs></ChartGraphs>

                </ChartContainer>
            </GamePerformance>



        </Background>
    );

}

const NavButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
background-color: #4A566E;
border: none;
width: 95%;
height: 10%;
color: white;
font-size: 1.3vw;
font-weight: bold;
border-radius: 10px;
transition: 0.3s ease-in-out;


&:hover {
    background-color: #19D14A;
    transition: 0.3s ease-in-out;
}

&: focus {
    background-color: #19D14A;
    transition: 0.3s ease-in-out;


}
`;
const ChartGraphs = styled.div`
width: 80%;
height: 90%;
margin-right: 2vw;
margin-left: 2vw;
background-color: white;
border-radius: 22px;
`;
const ChartButton = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
width: 20%;
height: 95%;
margin-left: 2vw;
background-color: #4A566E;
border-radius: 22px;
`;

const ChartContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
height: 90%;
width: 90%;
background-color: #B9B9A3;
border-radius: 22px;

`;
const Title = styled.div`
display: flex;
align-items: center;
justify-content: center;
color: black;
font-weight: black;
height: 20vh;
`;
const GamePerformance = styled.div`
margin-top: 5vw;
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
`;
const Background = styled.div`

background-image: url(${({ background }) => background});
height: 200vh;
width: 100%;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`;
const Dpic = styled.img`
width: 100%;
height: 100%;
`;
const ProfileInfo = styled.div`
height: 80vh;
`;

const Profileimg = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;

`;

const ImgDisplay = styled.div`
background-color: yellow;
height: 70%;
width: 75%;
`;

const SetButtons = styled.div`
display: flex;
flex-direction: row;
width: 75%;
height: 10%;

`;

const Icon = styled.div`
background: url(${({ iconimg }) => iconimg});
height: 2vw;
width: 2vw;
margin-right: 5px;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`;

const Selectimg = styled.button`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #ffffff;
color: #333333;
width: 50%;
border: none;
height: 100%;
border: 0.1px solid #333333;

font-weight: bold;
`;
const Deleteimg = styled.button`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #ffffff;
color: #333333;
width: 50%;
border: none;
height: 100%;
border: 0.1px solid #333333;
font-weight: bold;


`;
const ProfileDetails = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
height: 100%;
`;

const Row1 = styled.div`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const Col1 = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
`;
const Editinfo = styled.button`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #ffffff;
border-radius: 10px;
width: 100%;
height: 100%;
border: none;
color: #333333;
font-weight: bold;

box-shadow: 5px 8px 5px rgba(0,0,0,0.16);

&:hover {
    box-shadow: 5px 8px 10px rgba(0,0,0,0.3);
    transition: 0.3s ease-in-out;
    border: none;
}
`;
const InputTextField = withStyles({
    root: {
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        width: "100%",
        boxShadow: "5px 8px 5px rgba(0,0,0,0.16)",




        "&:hover .MuiOutlinedInput-notchedOutline": {
            boxShadow: "5px 8px 10px rgba(0,0,0,0.3)",
            transition: "0.3s ease-in-out",
            border: "1px solid #ffffff",

        },

        // "& #Muioutlined-basic": {
        //     fontWeight: "bold",
        //     color: "red",
        // },
        "&. MuiInputLabel-input": {
            fontWeight: "bold",
            color: "red",
        },

        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderRadius: "10px",
                width: "100%",
                transition: "0.3s ease-in-out",



            },
            "&.Mui-focused fieldset": {
                border: "3px solid #ffffff",


            },
            "& .MuiOutlinedInput-input": {
                textAlign: "left",
                fontSize: "1.5vw",
                color: "#000000",
                fontWeight: "bold",


            },
        },
    },

})(TextField);