import styles from "../styles/Task.module.css";
import { Card, Button } from "react-bootstrap";
import ITask from "../types/task";
import TaskTimeStamp from "./TaskTimeStamp";
import TaskStyle from "../styles/TaskPage.module.css";
import { ObjectId } from "mongoose";
import * as TasksApi from "../network/tasks_api";

interface TaskProps {
  task: ITask;
  className?: React.CSSProperties;
  deleteTask(deletedTaskId: ObjectId | undefined): void;
  onClick?(): void;
}

const Task = ({ task, className, deleteTask, onClick }: TaskProps) => {
  let { _id, title, text, priority, createdAt, updatedAt } = task;

  const priorityClass: any = {
    Low: styles.LowPriority,
    Medium: styles.MediumPriority,
    High: styles.HighPriority,
  };

  return (
    <Card
      onClick={onClick}
      className={`${styles.taskCard} ${TaskStyle.task} ${priorityClass[priority]}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <div className={styles.cardFooter}>
        <TaskTimeStamp timestamp={createdAt}>Created: </TaskTimeStamp>
        <TaskTimeStamp timestamp={updatedAt}>Last Updated: </TaskTimeStamp>
        <Button
          variant="dark"
          onClick={(event) => {
            event.stopPropagation();
            deleteTask(_id);
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default Task;
