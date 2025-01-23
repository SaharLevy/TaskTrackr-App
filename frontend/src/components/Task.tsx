import styles from "../styles/Task.module.css";
import { Card } from "react-bootstrap";
import ITask from "../types/task";
import TaskTimeStamp from "./TaskTimeStamp";
import TaskStyle from "../styles/TaskPage.module.css";
import { ObjectId } from "bson";
import { BsTrash3Fill } from "react-icons/bs";

interface TaskProps {
  task: ITask;
  className?: React.CSSProperties;
  onMouseUp?(e: React.MouseEvent): void;
  onMouseDown?(e: React.MouseEvent): void;
  handlerDeleteTask: (deletedTaskId: ObjectId) => void;
  setUpdateTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}

const Task = ({
  task,
  handlerDeleteTask,
  setUpdateTaskDialog,
  setSelectedTask,
}: TaskProps) => {
  let { _id, title, text, priority, createdAt, updatedAt } = task;

  const priorityClass: any = {
    Low: styles.LowPriority,
    Medium: styles.MediumPriority,
    High: styles.HighPriority,
  };

  return (
    <Card
      onClick={() => {
        setSelectedTask(task);
        setUpdateTaskDialog(true);
      }}
      className={`${styles.taskCard} ${TaskStyle.task} ${priorityClass[priority]}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className="d-flex justify-content-between">
          <span>{title}</span>
          <BsTrash3Fill
            className={styles.binIcon}
            role="button"
            tabIndex={0}
            onClick={(event) => {
              handlerDeleteTask(_id!);
              event.stopPropagation();
            }}
          />
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
