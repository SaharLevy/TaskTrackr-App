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
import {
  closestCenter,
  DndContext,
  DragStartEvent,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
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
  const holdTimer = useRef<NodeJS.Timeout | null>(null); // Timer to distinguish between click and hold
  const [isDragging, setIsDragging] = useState(false); // To track dragging state

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

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
    console.log("Deleting task with ID:", deletedTaskId);
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
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
                  <Task
                    task={task}
                    handlerDeleteTask={handlerDeleteTask}
                    setUpdateTaskDialog={setUpdateTaskDialog}
                    setSelectedTask={setSelectedTask}
                  />
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
          <div>
            <Droppable id="droppable">
              <span>Drop here to delete</span>
            </Droppable>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default TaskList;
