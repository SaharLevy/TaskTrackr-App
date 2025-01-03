import styles from "../styles/Task.module.css";
import { Card, Button } from "react-bootstrap";
import ITask from "../types/task";
import TaskTimeStamp from "./TaskTimeStamp";
import TaskStyle from "../styles/TaskPage.module.css";
import { ObjectId } from "mongoose";
import * as TasksApi from "../network/tasks_api";
import { BsTrash3Fill } from "react-icons/bs";

interface TaskProps {
  task: ITask;
  className?: React.CSSProperties;
  deleteTask(deletedTaskId: ObjectId | undefined): void;
  onMouseUp?(e: React.MouseEvent): void;
  onMouseDown?(e: React.MouseEvent): void;
}

const Task = ({
  task,
  className,
  deleteTask,
  onMouseDown,
  onMouseUp,
}: TaskProps) => {
  let { _id, title, text, priority, createdAt, updatedAt } = task;

  const priorityClass: any = {
    Low: styles.LowPriority,
    Medium: styles.MediumPriority,
    High: styles.HighPriority,
  };

  return (
    <Card
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={`${styles.taskCard} ${TaskStyle.task} ${priorityClass[priority]}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className="d-flex justify-content-between">
          <span>{title}</span>
          <BsTrash3Fill
            onClick={(event) => {
              event.stopPropagation();
              deleteTask(_id);
            }}
          ></BsTrash3Fill>
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <div className={styles.cardFooter}>
        <TaskTimeStamp timestamp={createdAt}>Created: </TaskTimeStamp>
        <TaskTimeStamp timestamp={updatedAt}>Last Updated: </TaskTimeStamp>
      </div>
    </Card>
  );
};

export default Task;
