import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ITask from "../types/task";
import { useForm } from "react-hook-form";
import * as tasks_api_functions from "../network/tasks_api";

interface UpdateTaskDialogProps {
  setUpdateTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  task: ITask;
  updateTaskList: () => void;
}
const UpdateTaskDialog = ({
  setUpdateTaskDialog,
  show,
  task,
  updateTaskList,
}: UpdateTaskDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ITask>();
  const handleClose = () => setUpdateTaskDialog(false);
  const [TaskPriority, SetTaskPriority] = useState("");

  const handlePriorityClick = (priority: any) => {
    SetTaskPriority(priority);
  };

  async function onSubmit(data: ITask) {
    try {
      const taskData: ITask = {
        _id: task._id,
        title: data.title,
        text: data.text,
        priority: TaskPriority,
      };
      handleClose();
      const taskResponse = await tasks_api_functions.updateTaskById(taskData);
      updateTaskList();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
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
    </>
  );
};

export default UpdateTaskDialog;
