import React, { Component } from "react";
import styled from "styled-components";
import "./Cardstyle.css";


export default class Cards extends Component {
    render() {
        return <Card circles={this.props.circles} level={this.props.level} description={this.props.description} image={this.props.image} />;

    }
}

function Card(props) {

    const Animate = () => {
        //Movement Animation to happen


        const card = document.querySelectorAll(".card");

        //Items
        const title = document.querySelectorAll(".title");


        const sneaker = document.querySelectorAll(".sneaker img");


        const purchase = document.querySelectorAll(".purchase");


        const description = document.querySelectorAll(".info h3");


        const sizes = document.querySelectorAll(".sizes");

        for (let i = 0; i <= 2; i++) {
            //Moving Animation Event
            card[i].addEventListener("mousemove", (e) => {

                let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                card[i].style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });

            //Animate In
            card[i].addEventListener("mouseenter", (e) => {
                card[i].style.transition = "none";
                //Popout
                title[i].style.transform = "translateZ(200px)";
                sneaker[i].style.transform = "translateZ(230px) rotateZ(-45deg)";
                description[i].style.transform = "translateZ(125px)";
                sizes[i].style.transform = "translateZ(100px)";
                purchase[i].style.transform = "translateZ(150px)";
            });



            //Animate Out
            card[i].addEventListener("mouseleave", (e) => {
                card[i].style.transition = "all 0.5s ease";
                card[i].style.transform = `rotateY(0deg) rotateX(0deg)`;
                //Popback
                title[i].style.transform = "translateZ(0px)";
                sneaker[i].style.transform = "translateZ(0px) rotateZ(0deg)";
                description[i].style.transform = "translateZ(0px)";
                sizes[i].style.transform = "translateZ(0px)";
                purchase[i].style.transform = "translateZ(0px)";
            });





        };
    }

    return (


        // <Crd onLoad={Animate}>
        //     <Animal>
        //         <Circle className={props.circles}></Circle>
        //         <Animalimg src={props.image} alt="bird" />

        //     </Animal>
        //     <Info>
        //         <Infoh1>{props.level}</Infoh1>
        //         <Infoh3>{props.description}</Infoh3>
        //         <Sizes>

        //             <Button>more-info</Button>

        //         </Sizes>
        //         <div className="purchase">
        //             <button >START</button>
        //         </div>
        //     </Info>
        // </Crd>

        <div className="card" onLoad={Animate}>
            <div className="sneaker">
                <div className={props.circles}></div>
                <img src={props.image} alt="bird" />

            </div>
            <div className="info">
                <h1 className="title">{props.level}</h1>
                <h3>{props.description}</h3>
                <div className="sizes">

                    <button className="active">more-info</button>

                </div>
                <div className="purchase">
                    <button >START</button>
                </div>
            </div>
        </div>



    );
};

const Circle = styled.div``;

const Crd = styled.div`
background-color: white;
  margin-left: 2rem;
  transform-style: preserve-3d;
  height: 90vh;
  width: 23rem;
  border-radius: 30px;
  padding: 1rem 5rem;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);
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
  margin-top: 2.5rem;
  font-size: 25px;
  transition: all 0.75s ease-out;
  font-weight: bold;

`;

const Infoh3 = styled.h3`
font-size: 1.3rem;
  padding: 2rem 0rem;
  color: #585858;
  font-weight: lighter;
  transition: all 0.75s ease-out;

`;

const Sizes = styled.div`
display: flex;
  justify-content: center;
  transition: all 0.75s ease-out;
`;

const Button = styled.button`
padding: 0.7rem 2rem;
  background: none;
  border: none;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  color: #585858;
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
        backgroundImage: "linear-gradient(to right, #08539c,#04c1f0)",

        position: "absolute",
        borderRadius: "50%",
        zIndex: "1",
    },

    circle2: {
        width: "9rem",
        height: "9rem",
        backgroundImage: "linear-gradient(to right, #08539c,#04c1f0)",

        position: "absolute",
        borderRadius: "50%",
        zIndex: "1",
    }
}