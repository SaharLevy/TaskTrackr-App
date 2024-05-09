import React from "react";
//import logo from "./logo.svg";
import MainNavBar from "../src/components/MainNavBar";
import TaskList from "./components/TaskList";
import { ClientRouter } from "./routers/ClientRouter";

function App() {
  return (
    // <div>
    //   <MainNavBar />
    //   <TaskList></TaskList>
    // </div>
    <ClientRouter />
  );
}

export default App;
