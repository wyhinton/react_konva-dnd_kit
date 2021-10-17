import React, { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";

const DropZone = ({
  droppedId,
  dragComplete,
}: {
  dragComplete: boolean;
  droppedId: string;
}): JSX.Element => {
  const { isOver, setNodeRef } = useDroppable({
    id: "dropzone",
    disabled: false,
  });
  const [text, setText] = useState("Drop On Me!");

  const dropZoneContainerStyle = {
    width: "100%",
    height: "10vh",
    border: isOver ? "1px dashed green" : "1px solid white",
  } as React.CSSProperties;

  useEffect(() => {
    console.log(`GOT DROP ZONE ID ${droppedId}`);
    console.log(dragComplete);
    if (dragComplete) {
      setText(droppedId);
    }
  }, [dragComplete, droppedId]);

  return (
    <div ref={setNodeRef} style={dropZoneContainerStyle}>
      <h1> {text}</h1>
    </div>
  );
};

export default DropZone;
