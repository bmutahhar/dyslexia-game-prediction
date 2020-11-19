import React from "react";
import "./App.css";
import Home from "./Components/Screens/Home";
import About from "./Components/Screens/About";
import Contact from "./Components/Screens/ContactUs";

function App() {
  return (
    <div className="App">
      
      <Home />
      <About/>
      <Contact />
      
    </div>
  );
}

export default App;
