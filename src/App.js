import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Screens/Home";
import About from "./Components/Screens/About";
import Contact from "./Components/Screens/ContactUs";
import HowItWorks from "./Components/Screens/HowItWorks";
import Login from "./Components/Screens/Login";
import Signup from "./Components/Screens/Signup";
import UserForm from "./Components/Screens/Formpage";
import Levelselect from "./Components/Screens/Levelselect";
import Avatar from "./Components/Screens/AvatarSelection";
import NotSupported from "./Components/Screens/NotSupported";

import { useMediaQuery } from "react-responsive";

function App() {
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
            </>
          ) : (
            <Route path="/notSupported" component={NotSupported} />
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

const MainPage = () => {
  const isNotMobileDevice = useMediaQuery({
    query: "(min-device-width:600px)",
  });
  return (
    <>
      <Navbar isNotMobileDevice={isNotMobileDevice}  />
      <Home />
      <HowItWorks />
      <About />
      <Contact />
    </>
  );
};
