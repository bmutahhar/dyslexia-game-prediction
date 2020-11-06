import React, { useEffect, useState } from "react";
import "./style/App.css";
import Home from "./Screens/Home";

function App() {
  const [home, setHome] = useState("Api Not Loaded!");
  useEffect(() => {
    fetch("/api/v1/home")
      .then((resp) => resp.json())
      .then((result) => {
        setHome(result.API)
        console.log(result["API"]);
      });
  }, []);
  return (
    <div className="App">
      <Home />
      <h2>{home}</h2>
    </div>
  );
}

export default App;
