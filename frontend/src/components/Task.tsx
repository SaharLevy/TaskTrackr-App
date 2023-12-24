import styles from "../styles/Task.module.css";
import { Card, Button } from "react-bootstrap";
import Task from "../models/task";
import TaskTimeStamp from "./TaskTimeStamp";
import TaskStyle from "../styles/TaskPage.module.css";

interface TaskProps {
  task: Task;
  className?: React.CSSProperties;
}

const TaskComponent = (props: TaskProps, className: string) => {
  let { _id, title, text, priority, createdAt, updatedAt } = props.task;

  const priorityClass: any = {
    Low: styles.LowPriority,
    Medium: styles.MediumPriority,
    High: styles.HighPriority,
  };

  return (
    <Card
      className={`${styles.taskCard} ${TaskStyle.task} ${priorityClass[priority]}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <div className={styles.cardFooter}>
        <TaskTimeStamp timestamp={createdAt}>Created: </TaskTimeStamp>
        <TaskTimeStamp timestamp={updatedAt}>Last Updated: </TaskTimeStamp>
        <Button variant="dark">Delete</Button>
      </div>
    </Card>
  );
};

export default TaskComponent;
