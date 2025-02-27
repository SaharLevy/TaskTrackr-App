import { Button, Form, Modal } from "react-bootstrap";
import "../styles/TaskPriority.css";
import { useState } from "react";
import ITask from "../types/task";
import { useForm } from "react-hook-form";
//import { TaskInput } from "../network/tasks_api";
import * as tasks_api_functions from "../network/tasks_api";
import { useAuthContext } from "../hooks/useAuthContext";

interface AddTaskDialogProps {
  onDismiss: () => void;
  onTaskSaved: () => void;
  updateTaskList: () => void;
}

const AddTaskDialog = ({
  onDismiss,
  onTaskSaved,
  updateTaskList,
}: AddTaskDialogProps) => {
  const [TaskPriority, SetTaskPriority] = useState("");
  const { user } = useAuthContext();
  const headers = {
    Authorization: `Bearer ${user?.token}`,
  };
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ITask>();
  //const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePriorityClick = (priority: any) => {
    SetTaskPriority(priority);
  };

  async function onSubmit(data: ITask) {
    try {
      const taskData: ITask = {
        title: data.title,
        text: data.text,
        priority: TaskPriority,
        userId: user._id,
      };
      onTaskSaved();
      const taskResponse = await tasks_api_functions.createTask(
        taskData,
        headers
      );
      // i should add a spinner animation here because there is a delay, the cause is fetching.
      //
      updateTaskList();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="TaskForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>

            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register("text")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <div className="d-flex justify-content-center">
              <p>Low</p>
              <Button
                onClick={() => handlePriorityClick("Low")}
                className="TaskPriorityShapeCircle CircleColorYellow roundedCircle "
              ></Button>
              <p>Medium</p>
              <Button
                onClick={() => handlePriorityClick("Medium")}
                className="TaskPriorityShapeCircle CircleColorBlue roundedCircle "
              ></Button>
              <p>High</p>
              <Button
                onClick={() => handlePriorityClick("High")}
                className="TaskPriorityShapeCircle CircleColorRed roundedCircle "
              ></Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="TaskForm"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskDialog;
