import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Screens/Home";
import About from "./Components/Screens/About";
import Contact from "./Components/Screens/ContactUs";
import HowItWorks from "./Components/Screens/HowItWorks";
import Login from "./Components/Screens/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          {/* <Route path="/login" component={Login} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: false,
    };
  }
  handleLogin = () => {
    this.setState({ displayLogin: !this.state.displayLogin });
  };
  render() {
    return (
      <>
        {this.state.displayLogin ? (
          <>
            <Home />
            <Login handleLogin={this.handleLogin} />
          </>
        ) : (
          <>
            <Navbar handleLogin={this.handleLogin} />
            <Home handleLogin={this.handleLogin} />
            <HowItWorks />
            <About />
            <Contact />
          </>
        )}
      </>
    );
  }
}
