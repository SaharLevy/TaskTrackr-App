import { Button, Container } from "react-bootstrap";
import AddTaskDialog from "./AddTaskDialog";
import "../network/tasks_api";
import Task from "../models/task";

interface AddTaskButtonProps {
  showAddTaskDialog: boolean;
  setAddTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  updateTaskList: (newTask: Task) => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({
  showAddTaskDialog,
  setAddTaskDialog,
  updateTaskList,
}) => {
  return (
    <Container className=" d-flex justify-content-end pe-0 ps-0">
      <Button
        onClick={() => {
          setAddTaskDialog(true);
        }}
        className="mb-2"
      >
        Add Task
      </Button>
      {showAddTaskDialog && (
        <AddTaskDialog
          onDismiss={() => setAddTaskDialog(false)}
          onTaskSaved={() => {
            setAddTaskDialog(false);
          }}
          updateTaskList={updateTaskList}
        />
      )}
    </Container>
  );
};

export default AddTaskButton;
