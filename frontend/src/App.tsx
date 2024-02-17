import React from "react";
//import logo from "./logo.svg";
import MainNavBar from "../src/components/MainNavBar";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div>
      <MainNavBar />
      <TaskList></TaskList>
    </div>
  );
}

export default App;
