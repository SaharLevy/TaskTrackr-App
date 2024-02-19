import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ITask from "../types/task";

interface UpdateTaskDialogProps {
  setUpdateTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  task: ITask;
}
const UpdateTaskDialog = ({
  setUpdateTaskDialog,
  show,
}: UpdateTaskDialogProps) => {
  const handleClose = () => setUpdateTaskDialog(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTaskDialog;
