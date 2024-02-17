import { Col, Container, Row } from "react-bootstrap";
import AddTaskButton from "./AddTaskButton";
import Task from "./Task";
import { useEffect, useState } from "react";
import ITask from "../types/task";
import * as TasksApi from "../network/tasks_api";
import { ObjectId } from "mongoose";
import OrderByButton from "./OrderByButton";
import UpdateTaskDialog from "./UpdateTaskDialog";

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showAddTaskDialog, setAddTaskDialog] = useState(false);
  const [showUpdateTaskDialog, setUpdateTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

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

  const handleTaskClick = (task: ITask) => {
    console.log("Task clicked:", task);
    setSelectedTask(task);
    setUpdateTaskDialog(true);
  };

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
          <OrderByButton tasks={tasks} setTasks={setTasks} />
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
            <Task
              onClick={() => handleTaskClick(task)}
              task={task}
              deleteTask={handlerDeleteTask}
            />
          </Col>
        ))}
      </Row>
      {selectedTask && (
        <UpdateTaskDialog
          setUpdateTaskDialog={setUpdateTaskDialog}
          show={showUpdateTaskDialog}
          task={selectedTask}
        />
      )}
    </Container>
  );
};

export default TaskList;
