import { Col, Container, Row } from "react-bootstrap";
import AddTaskButton from "./AddTaskButton";
import Task from "./Task";
import { useEffect, useRef, useState } from "react";
import ITask from "../types/task";
import * as TasksApi from "../network/tasks_api";
import { ObjectId } from "mongoose";
import OrderByButton from "./OrderByButton";
import UpdateTaskDialog from "./UpdateTaskDialog";
import PriorityDataCard from "./PriorityDataCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { closestCenter, DndContext, DragStartEvent } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Style from "../styles/DragTaskHandler.module.css";

// Extend the Window interface to include checkForDrag
declare global {
  interface Window {
    checkForDrag: number;
  }
}

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showAddTaskDialog, setAddTaskDialog] = useState(false);
  const [showUpdateTaskDialog, setUpdateTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { user, loading } = useAuthContext();
  const [isHoldClick, setIsHoldClick] = useState(false); // To track whether it’s a drag or click
  const holdTimer = useRef<NodeJS.Timeout | null>(null); // Timer to distinguish between click and hold
  const [isDragging, setIsDragging] = useState(false); // To track dragging state

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

  async function handleTaskComplete(taskId: string) {
    try {
      await TasksApi.completeTaskById(taskId, headers);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id && task._id.toString() !== taskId)
      ); // Remove task from list
    } catch (error) {
      console.error("Error completing task:", error);
    }
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    window.checkForDrag = e.clientX;
    setTimeout(() => {
      if (isHoldClick) {
        setIsHoldClick(true);
        setIsDragging(true);
      }
    }, 300);
  };

  const handleMouseUp = (e: React.MouseEvent, task: ITask) => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    const mouseUp = e.clientX;
    if (
      mouseUp < window.checkForDrag + 5 &&
      mouseUp > window.checkForDrag - 5
    ) {
      setIsHoldClick(false);
      handleTaskClick(task);
    } else {
      setIsHoldClick(false);
      setIsDragging(false);
      // add logic for drag
    }
  };
  const handleTaskClick = (task: ITask) => {
    // Prevent click event if the task was dragged
    if (!isHoldClick) {
      // If not a hold (drag), trigger the click event for editing
      console.log("Task clicked:", task);
      setSelectedTask(task);
      setUpdateTaskDialog(true);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setIsDragging(false);
    console.log("active: ", active); // Contains draggable info (task data)
    console.log("over: ", over); // Contains droppable info

    if (over && active.data.current) {
      const droppedTask = active.data.current.task as ITask;
      const droppableId = over.id;

      // Perform the action you need, e.g., transfer the task to a new list, complete the task, etc.
      console.log(
        `Task "${droppedTask.title}" was dropped on droppable area: ${droppableId}`
      );
      handlerDeleteTask(droppedTask._id!);

      // You can handle task completion or transfer here
    }
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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {/* will add a div that will be the drop box */}
      <div className={Style.taskListContainer}>
        <Container className="px-0 ">
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
                <Draggable id={task!._id!.toString()} data={task}>
                  <div style={{ width: "100%", height: "100%" }}>
                    <Task
                      onMouseUp={(e: React.MouseEvent) =>
                        handleMouseUp(e, task)
                      }
                      onMouseDown={handleMouseDown}
                      task={task}
                      deleteTask={handlerDeleteTask}
                    />
                  </div>
                </Draggable>
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
        {isDragging && (
          <div className={Style.droppableContainer}>
            <Droppable id="droppable">
              <div className={Style.dropArea}>
                <span>Drop here to delete</span>
              </div>
            </Droppable>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default TaskList;
