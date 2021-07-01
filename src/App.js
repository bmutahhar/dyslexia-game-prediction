import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./Components";
import {
  Home,
  HowItWorks,
  About,
  Contact,
  Avatar,
  UserForm,
  Levelselect,
  Login,
  Signup,
  NotSupported,
  PreSchoolers,
  Learners,
  Elementary,
  AllBadgeDisplay,
  InstructionScreen,
  ProfileTracking,
  ResultScreen,
} from "./Screens";
import { GameReview } from "./Components";
import { useMediaQuery } from "react-responsive";

import "./App.css";
import "react-dragula/dist/dragula.css";

const App = () => {
  const isNotMobileDevice = useMediaQuery({
    query: "(min-device-width:600px)",
  });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          {isNotMobileDevice ? (
            <>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/userform" component={UserForm} />
              <Route path="/levelSelect" component={Levelselect} />
              <Route path="/selectAvatar" component={Avatar} />
              <Route path="/preschooler" component={PreSchoolers} />
              <Route path="/learner" component={Learners} />
              <Route path="/elementary" component={Elementary} />
              <Route path="/completed" component={AllBadgeDisplay} />
              <Route path="/instruction" component={InstructionScreen} />
              <Route path="/profile" component={ProfileTracking} />
              <Route path="/diagnosisResult" component={ResultScreen} />
              <Route path="/review" component={GameReview} />
            </>
          ) : (
            <Route path="/notSupported" component={NotSupported} />
          )}
        </Switch>
      </div>
    </Router>
  );
};

export default App;

const MainPage = () => {
  const isNotMobileDevice = useMediaQuery({
    query: "(min-device-width:600px)",
  });
  return (
    <>
      <Navbar isNotMobileDevice={isNotMobileDevice} />
      <Home />
      <HowItWorks />
      <About />
      <Contact />
    </>
  );
};
