import React, { Component } from "react";
import image from "../Images/third.png";
import bird1 from "../Images/Characters/bird1.png";
import bird2 from "../Images/Characters/bird2.png";
import bird3 from "../Images/Characters/bird3.png";
import eagle from "../Images/Characters/eagle.png";
import sun from "../Images/Characters/sun.png";
import cloud from "../Images/Characters/cloud.png";
import cloudsun from "../Images/Characters/cloudsun.png";
import cloudfooter from "../Images/Characters/cloudfooter.png";
import Background from "../../Components/Background";
import rectangle from "../Images/Characters/Rectangle 20.png";

import Character from "../Character";


import Navbar from "../Navbar";

export default class ContactUs extends Component {
  render() {
    const styles = {

       
      
        sun:{
            position: "absolute",
            zIndex: 1,
            height: "25%",
            bottom:"-135%",
            left: "0%"
          },

          cloudsun:{
            
            position: "absolute",
            zIndex: 2,
            height: "13%",
            bottom:"-135%",
            left: "4%"
          },
        
          cloud:{
            
            position: "absolute",
            zIndex: 1,
            height: "13%",
            bottom:"-120%",
            right: "4%"
          },

          bird1:{
            
            position: "absolute",
            zIndex: 3,
            
            bottom:"-150%",
            left: "17%"
          },

          bird2:{
            
            position: "absolute",
            zIndex: 3,
            
            bottom:"-163%",
            left: "19%"
          },

          bird3:{
            
            position: "absolute",
            zIndex: 3,
            
            bottom:"-180%",
            left: "19%"
          },


      eagle: {
        height: "30%",
        position: "absolute",
        bottom: "-200%",
        right: "1%",
        zIndex: 2,
      },
      cloudfooter: {
        
        width: "100%",
        position: "absolute",
        zIndex:1,
        bottom: "-200%",
        right: 0,
        left: 0,
      },
    };
    return (
      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        customStyle={false}
        src={image}
        // style={{position:"fixed"}}
      >
          
        
         <Character
        className="eagle"
        src={eagle} 
        alt="eagle"
        style={styles.eagle} 
        />
        
        <Character
        className="cloudfooter"
        src={cloudfooter} 
        alt="cloudfooter"
        style={styles.cloudfooter} 
        />


        <Character
        className="bird1"
        src={bird1} 
        alt="bird1"
        style={styles.bird1} 
        />
        
        <Character
        className="bird2"
        src={bird2} 
        alt="bird2"
        style={styles.bird2} 
        />

        <Character
        className="bird3"
        src={bird3} 
        alt="bird3"
        style={styles.bird3} 
        />

        <Character
        className="sun"
        src={sun} 
        alt="sun"
        style={styles.sun} 
        />

        <Character
        className="cloud"
        src={cloud} 
        alt="bird3"
        style={styles.cloud} 
        />

        <Character
        className="cloudsun"
        src={cloudsun} 
        alt="cloudsun"
        style={styles.cloudsun} 
        />

     
        <Navbar />
        

      </Background>
    );
  }
}