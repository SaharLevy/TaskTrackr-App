import React from "react";
import { useDndContext, useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  children: React.ReactNode;
}

const Droppable: React.FC<Props> = ({ id, children }) => {
  const { active, over } = useDndContext();
  const { setNodeRef, isOver } = useDroppable({
    id: "droppable",
    data: {
      accepts: ["ITask", "type1"],
    },
  });
  // Check if the task is being dropped
  const task = active?.data?.current?.task;
  const isDropped = over && over.id === id;

  const droppableStyle: React.CSSProperties = {
    backgroundColor: isOver ? "#f0f8ff" : "#fff", // Visual feedback for hovering
    width: "300px",
  };
  return (
    <div ref={setNodeRef} style={droppableStyle}>
      {children}
      {isDropped && task ? (
        <p>{`Task "${task.title}" was dropped on droppable area!!: ${id}`}</p>
      ) : null}
    </div>
  );
};
export default Droppable;
