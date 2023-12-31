import { Col, Container, Row } from "react-bootstrap";
import AddTaskButton from "./AddTaskButton";
import TaskComponent from "./Task";
import { useEffect, useState } from "react";
import Task from "../models/task";
import * as TasksApi from "../network/tasks_api";
import { ObjectId } from "mongoose";
import OrderByButton from "./OrderByButton";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTaskDialog, setAddTaskDialog] = useState(false);

  async function loadTasks() {
    try {
      const tasks = await TasksApi.fetchTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks. See console for details.");
    }
  }

  async function handlerDeleteTask(deletedTaskId: ObjectId) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== deletedTaskId)
    );
    await TasksApi.deleteTaskById(deletedTaskId);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const updateTaskList = () => {
    loadTasks();
  };
  return (
    <Container className="pe-0 ps-0">
      <Row className="d-flex  justify-content-between ">
        <Col xs="auto">
          <OrderByButton />
        </Col>
        <Col className=" pe-0" xs="auto">
          <AddTaskButton
            showAddTaskDialog={showAddTaskDialog}
            setAddTaskDialog={setAddTaskDialog}
            updateTaskList={updateTaskList}
          />
        </Col>
      </Row>

      <Row xs={1} md={2} xl={3} className="g-4">
        {tasks.map((task) => (
          <Col key={task._id ? task._id.toString() : "no-id"}>
            <TaskComponent task={task} deleteTask={handlerDeleteTask} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TaskList;
