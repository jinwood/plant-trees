import React from "react";
import logo from "./logo.png";
import { TreeCount } from "./features/tree-count/TreeCount";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TreeCount />
      </header>
    </div>
  );
}

export default App;
