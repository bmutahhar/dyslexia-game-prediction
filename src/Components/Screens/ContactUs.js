import React, { Component } from "react";
import image from "../Images/last.png";
import stone from "../Images/Characters/stonefooter.png";
import kangaroo from "../Images/Characters/kangaroo.png";
import koala from "../Images/Characters/koala.png";

import Background from "../../Components/Background";

import Character from "../Character";

export default class ContactUs extends Component {
  render() {
   
    return (
      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        id = "contact"
        customStyle={false}
        src={image}
        // style={{position:"fixed"}}
      >

      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        style={styles.topDiv}
        customStyle={true}
        // style={{position:"fixed"}}
      ></Background>

      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        style={styles.bottomDiv}
        customStyle={true}
        // style={{position:"fixed"}}
      ></Background>

      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        style={styles.kangarooDiv}
        customStyle={true}
        // style={{position:"fixed"}}
      >
        <h3>Hello, I'M Kangaroo</h3>
        <p>Parents Can Find Contact Information Here And Can Email Us With Any Query They Have</p>
      </Background>

      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        style={styles.koalaDiv}
        customStyle={true}
        // style={{position:"fixed"}}
      >
        <h3>Hello, I'M KOALA BEAR</h3>
        <p>Here User Can Also Request Us For Our Data For Their Own Research</p>
      </Background>
        
        <Character
        className="kangaroo"
        src={kangaroo} 
        alt="kangaroo"
        style={styles.kangaroo} 
        />

        <Character
        className="koala"
        src={koala} 
        alt="koala"
        style={styles.koala} 
        />




        <Character
          className="stone"
          src={stone}
          alt="stone"
          style={styles.stone}
          onerror={`this.src=${stone}`}
        />
      </Background>
    );
  }
}
const styles = {
      
      
  kangaroo: {
    height: "40%",
    position: "absolute",
    bottom: "-300%",
    right: "1%",
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
    zIndex:1,
    bottom: "-300%",
    right: 0,
    left: 0,
  },

  bottomDiv: {
    color: "black",
    fontSize: "18px",
    backgroundImage:"linear-gradient(to right, #80562D, #BB461A)",
    alignItems:"center",
    textAlign:"left",
    justifyContent:"center",
    borderRadius: "30px",
    border:"2px solid black",
    
    position: "absolute",
    
     minWidth: "10%",
     minHeight: "5%",

    width: "64%",
    height: "15%",
    margin: "5px",
    padding: "20px",
    right: "17.5%",
    bottom: "-292%"
    
  },

  topDiv: {
    color: "black",
    fontSize: "18px",
    backgroundColor: "#C44F1E",
    alignItems:"center",
    textAlign:"left",
    justifyContent:"center",
    borderRadius: "30px",
    border:"none",
    
    position: "absolute",
    
     minWidth: "10%",
     minHeight: "5%",

    width: "64%",
    height: "65%",
    margin: "5px",
    padding: "20px",
    right: "17.5%",
    bottom: "-275%"
    
  },

  kangarooDiv: {
    color: "black",
    fontSize: "18px",
    backgroundColor:"#F19611",
    alignItems:"center",
    textAlign:"left",
    justifyContent:"center",
    borderRadius: "30px",
    border:"5px solid #C2501E",
    
    position: "absolute",
    
     minWidth: "10%",
     minHeight: "25%",

    width: "15%",
    height: "45%",
    margin: "5px",
    padding: "20px",
    right: "1%",
    bottom: "-265%"
    
  },

  koalaDiv: {
    color: "black",
    fontSize: "18px",
    backgroundColor:"#A7A8AC",
    alignItems:"center",
    textAlign:"left",
    justifyContent:"center",
    borderRadius: "30px",
    border:"5px solid #494A4E",
    
    position: "absolute",
    
     minWidth: "10%",
     minHeight: "25%",

    width: "15%",
    height: "45%",
    margin: "5px",
    padding: "20px",
    left: "1%",
    bottom: "-265%"
    
  },




};