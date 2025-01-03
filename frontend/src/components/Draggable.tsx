import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ITask from "../types/task";

interface Props {
  children: React.ReactNode;
  id: string;
  data: ITask;
}

const Draggable: React.FC<Props> = ({ children, id, data }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type: "ITask", task: data },
  });
  const draggableStyle = {
    transform: CSS.Transform.toString(transform) || undefined, // Apply only transform for dragging,
  };

  return (
    <div {...attributes} {...listeners} ref={setNodeRef} style={draggableStyle}>
      {children}
    </div>
  );
};

export default Draggable;
