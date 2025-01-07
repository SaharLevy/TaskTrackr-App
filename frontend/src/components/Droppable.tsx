import React from "react";
import { useDndContext, useDroppable } from "@dnd-kit/core";
import styles from "../styles/DragTaskHandler.module.css";

interface Props {
  id: string;
  children: React.ReactNode;
}

const Droppable: React.FC<Props> = ({ id, children }) => {
  const { active } = useDndContext();
  const { setNodeRef, isOver } = useDroppable({
    id: "droppable",
    data: {
      accepts: ["ITask", "type1"],
    },
  });

  const task = active?.data?.current?.task;

  return (
    <div
      ref={setNodeRef}
      className={styles.droppableContainer}
      style={{
        backgroundColor: isOver ? "rgba(0, 255, 0, 0.2)" : "transparent",
        transition: "background-color 0.2s",
      }}
    >
      {children}
    </div>
  );
};
export default Droppable;
