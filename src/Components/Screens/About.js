import React, { Component } from "react";
import Background from "../../Components/Background";
import Character from "../Character";
import image from "../../Components/Images/second.png";
import rectangle from "../Images/Characters/rectangle.png";
import dolphin from "../Images/Characters/dolphin.png";
import fish1 from "../Images/Characters/fish1.png";
import fish2 from "../Images/Characters/fish2.png";
import fish3 from "../Images/Characters/fish3.png";
import fish4 from "../Images/Characters/fish4.png";
import fish5 from "../Images/Characters/fish5.png";
import fish6 from "../Images/Characters/fish6.png";

export default class About extends Component {
  render() {
    const styles = {
      blueDiv: {
        display:"flex",
        // position: "absolute",
        fontSize: "16px",
        textAlign: "justify",
        textJustify: "inter-word",
        color: "white",
        minWidth: "50%",
        minHeight: "40%",
        width: "70%",
        height: "65%",
        margin: "2px",
        padding: "20px",
        borderRadius: "50px",
      },
      dolphin: {
        position: "absolute",
        // zIndex: 2,
        height: "25%",
        bottom:"-100%",
        left: "10%",
        right:"2%",
        transform:"rotate(-20deg)"
      },
      fish1:{
        position: "absolute",
        zIndex: 2,
        height: "10%",
        bottom:"-60%",
        left: "5%",
      },
      fish2:{
        position: "absolute",
        // zIndex: 1,
        height: "10%",
        bottom:"-95%",
        left: "40%",
      },
      fish3:{
        position: "absolute",
        zIndex: 2,
        height: "20%",
        bottom:"-95%",
        right: "4%",
      },
      fish4:{
        position: "absolute",
        zIndex: 2,
        height: "20%",
        bottom:"-30%",
        left: "4%"
      },
      fish5:{
        position: "absolute",
        zIndex: 2,
        height: "10%",
        // width: "5%",
        bottom:"-25%",
        right: "30%"
      },
      fish6:{
        position: "absolute",
        zIndex: 2,
        height: "15%",
        // width: "5%",
        bottom:"-40%",
        right: "5%",
        transform:"rotate(-25deg)"
      },
      
      
    };
    return (
      <Background
        src={image}
        className="d-flex align-items-center justify-content-center flex-column"
        customStyle={false}
      >
        <Background className="d-flex justify-justify-content-between flex-column"
        style={styles.blueDiv}
        customStyle={true}
        src={rectangle}
        >
        <h2 style={{textAlign: 'center'}}>Mutahhar you is very noob!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          placerat vehicula arcu, cursus imperdiet nisl semper eget. Donec enim
          tortor, molestie tincidunt commodo vitae, mollis quis dui. In vel
          elementum nunc. Phasellus et leo sagittis, interdum ante et, placerat
          magna. Donec commodo condimentum enim sit amet consectetur. Etiam a
          scelerisque urna, a volutpat lectus. Sed quis lacus lorem. Nam
          imperdiet, leo et mattis ullamcorper, purus quam convallis turpis,
          quis suscipit quam diam eu nunc. Cras eleifend eleifend nisi, eget
          pulvinar quam vestibulum ac. Pellentesque vestibulum, velit ac porta
          mattis, massa purus commodo arcu, sed vulputate nunc dui sit amet
          neque.
        </p>
        </Background>
        <Character
        src={dolphin}
        className="dolphin"
        alt="dolphin"
        style={styles.dolphin}
        />
        <Character
          src={fish1}
          alt="fish1"
          className="fish1"
          style={styles.fish1}
        />
        <Character
          src={fish2}
          alt="fish2"
          className="fish2"
          style={styles.fish2}
        />
        <Character
          src={fish3}
          alt="fish3"
          className="fish3"
          style={styles.fish3}
        />
         <Character
          src={fish4}
          alt="fish4"
          className="fish4"
          style={styles.fish4}
        />
        <Character
          src={fish5}
          alt="fish5"
          className="fish5"
          style={styles.fish5}
        />
        <Character
          src={fish6}
          alt="fish6"
          className="fish6"
          style={styles.fish6}
        />
      </Background>
    );
  }
}
