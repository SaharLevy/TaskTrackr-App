import { Col, Container, Row } from "react-bootstrap";
import AddTaskButton from "./AddTaskButton";
import Task from "./Task";
import { useEffect, useState } from "react";
import ITask from "../types/task";
import * as TasksApi from "../network/tasks_api";
import { ObjectId } from "mongoose";
import OrderByButton from "./OrderByButton";
import UpdateTaskDialog from "./UpdateTaskDialog";
import PriorityDataCard from "./PriorityDataCard";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showAddTaskDialog, setAddTaskDialog] = useState(false);
  const [showUpdateTaskDialog, setUpdateTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { user, loading } = useAuthContext();
  const headers = {
    Authorization: `Bearer ${user?.token}`,
    User: user._id,
  };
  async function loadTasks() {
    if (!user) {
      console.error("No user logged in");
      return;
    }
    try {
      const tasks = await TasksApi.fetchTasks(headers);
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks. See console for details.");
    }
  }

  async function handlerDeleteTask(deletedTaskId: ObjectId) {
    if (!user) {
      console.error("No user logged in");
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== deletedTaskId)
    );
    await TasksApi.deleteTaskById(deletedTaskId, headers);
  }

  const handleTaskClick = (task: ITask) => {
    console.log("Task clicked:", task);
    setSelectedTask(task);
    setUpdateTaskDialog(true);
  };

  useEffect(() => {
    if (!loading && user && user._id) {
      loadTasks(); // Only load tasks if user is available and has an _id
    }
  }, [user, loading]);

  const updateTaskList = () => {
    loadTasks();
  };
  return (
    <Container className="px-0">
      <Container className="px-0">
        <PriorityDataCard tasks={tasks}></PriorityDataCard>
      </Container>
      <Container className="d-flex  justify-content-between px-0 ">
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
      </Container>
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
          updateTaskList={updateTaskList}
        />
      )}
    </Container>
  );
};

export default TaskList;
