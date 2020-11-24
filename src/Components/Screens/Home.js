import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import image from "../Images/first.png";
import topMonkey from "../Images/Characters/topmonkey.png";
import bottomMonkey from "../Images/Characters/bottommonkey.png";
import grass from "../Images/Characters/grass.svg";
import altGrass from "../Images/Characters/grass.png";
import lion from "../Images/Characters/lion.png";
import Background from "../Background";
import Character from "../Character";
import Jumbotron from "../Jumbotron";

class Home extends Component {
  render() {
    return <HomePage handleLogin={this.props.handleLogin} />;
  }
}

export default withRouter(Home);

const HomePage = (props) => {
  return (
    <>
      <Background
        className="d-flex align-items-center justify-content-center flex-column"
        id="home"
        customStyle={false}
        src={image}
      >
        <Jumbotron handleLogin={props.handleLogin} />

        <Background
          className="d-flex align-items-center justify-content-center flex-column"
          style={styles.lionDiv}
          customStyle={true}
          // style={{position:"fixed"}}
        >
          <h3>Hey, I'M SIMBA</h3>
          <p>
            I'm A Friend Of Jonny, Me And Jonny Will Tag Along While You Have
            Some Fun
          </p>
        </Background>

        <Background
          className="d-flex align-items-center justify-content-center flex-column"
          style={styles.monkeyDiv}
          customStyle={true}
          // style={{position:"fixed"}}
        >
          <h3>HI, I'M JONNY</h3>
          <p>
            You Are Really Going To Enjoy This Game, Come Lets Have Some Fun
          </p>
        </Background>

        <Character
          className="top-monkey"
          src={topMonkey}
          alt="Top Monkey"
          style={styles.topMonkey}
        />
        <Character
          className="bottom-monkey"
          src={bottomMonkey}
          alt="Bottom Monkey"
          style={styles.bottomMonkey}
        />
        <Character className="lion" src={lion} alt="Lion" style={styles.lion} />
        <Character
          className="grass"
          src={grass}
          alt="Grass"
          style={styles.grass}
          onerror={`this.src=${altGrass}`}
        />
      </Background>
    </>
  );
};

const styles = {
  topMonkey: {
    height: "30%",
    position: "absolute",
    top: 0,
    right: "15%",
    zIndex: 1,
  },
  bottomMonkey: {
    height: "30%",
    position: "absolute",
    bottom: 5,
    left: "3%",
    zIndex: 1,
  },
  lion: {
    height: "30%",
    position: "absolute",
    bottom: 5,
    right: "5%",
    zIndex: 1,
  },
  grass: {
    width: "100%",
    position: "absolute",
    zIndex: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  lionDiv: {
    color: "black",
    fontSize: "18px",
    backgroundColor: "#F3A61F",
    alignItems: "center",
    textAlign: "left",
    justifyContent: "center",
    borderRadius: "30px",
    border: "5px solid #993A02",
    position: "absolute",
    minWidth: "10%",
    minHeight: "25%",
    width: "15%",
    height: "45%",
    margin: "5px",
    padding: "20px",
    right: "3%",
    bottom: "30%",
  },
  monkeyDiv: {
    color: "black",
    fontSize: "18px",
    backgroundColor: "#F9CEAE",
    alignItems: "center",
    textAlign: "left",
    justifyContent: "center",
    borderRadius: "30px",
    border: "5px solid #5B3E36",
    position: "absolute",
    minWidth: "10%",
    minHeight: "25%",
    width: "15%",
    height: "45%",
    margin: "5px",
    padding: "20px",
    left: "3%",
    bottom: "30%",
  },
};
