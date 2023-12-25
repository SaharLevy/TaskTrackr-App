import { Col, Container, Row } from "react-bootstrap";
import AddTaskButton from "./AddTaskButton";
import TaskComponent from "./Task";
import { useEffect, useState } from "react";
import Task from "../models/task";
import * as TasksApi from "../network/tasks_api";
import { ObjectId } from "mongoose";

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
    const deleteResponse = await TasksApi.deleteTaskById(deletedTaskId);
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== deletedTaskId)
    );
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const updateTaskList = (newTask: Task) => {
    loadTasks();
  };
  return (
    <Container className="pe-0 ps-0">
      <AddTaskButton
        showAddTaskDialog={showAddTaskDialog}
        setAddTaskDialog={setAddTaskDialog}
        updateTaskList={updateTaskList}
      />
      <Row xs={1} md={2} xl={3} className="g-4">
        {tasks.map((task) => (
          <Col key={task._id}>
            <TaskComponent task={task} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TaskList;
