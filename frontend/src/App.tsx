import React, { useState, useEffect } from "react";
//import logo from "./logo.svg";
import { Container, Row, Col } from "react-bootstrap";
import Task from "./models/task";
import TaskComponent from "./components/Task";
import MainNavBar from "../src/components/MainNavBar";
import * as TasksApi from "./network/tasks_api";
import AddTaskButton from "./components/AddTaskButton";
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
