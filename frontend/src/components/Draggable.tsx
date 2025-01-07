import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ITask from "../types/task";
import styles from "../styles/DragTaskHandler.module.css";

interface Props {
  children: React.ReactNode;
  id: string;
  data: ITask;
}

const Draggable: React.FC<Props> = ({ children, id, data }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: { type: "ITask", task: data },
    });
  if (transform) {
    transform.scaleX = 1;
    transform.scaleY = 1;
  }
  const transformString = CSS.Transform.toString(transform);
  console.log("Transform:", transformString);

  const draggableStyle: React.CSSProperties = {
    transform: transformString,
    maxWidth: "100%",
    height: "auto",
    zIndex: isDragging ? 1001 : "auto",
    boxSizing: "border-box",
    transition: isDragging ? "none" : "transform 0.2s ease-in-out",
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={draggableStyle}
      className={styles.draggable}
    >
      <div style={{ width: "100%", height: "100%" }}>{children}</div>
    </div>
  );
};

export default Draggable;
