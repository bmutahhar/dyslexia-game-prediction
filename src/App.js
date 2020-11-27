import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Screens/Home";
import About from "./Components/Screens/About";
import Contact from "./Components/Screens/ContactUs";
import HowItWorks from "./Components/Screens/HowItWorks";
import Login from "./Components/Screens/Login";
import Signup from "./Components/Screens/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

class MainPage extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Home />
        <HowItWorks />
        <About />
        <Contact />
      </>
    );
  }
}
