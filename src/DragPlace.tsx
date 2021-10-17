import Konva from "konva";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { KonvaEventObject } from "konva/lib/Node";
import { MouseSensor, useDraggable, useSensor } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";

const DragPlace = ({
  id,
  position,
  isDragging,
  clickRef,
  dragRef,
  draggableId,
  currentRect,
}: // transform,
// setId,
// rectRef,
// onCanvasClick,
{
  id: string;
  position: { x: number; y: number };
  isDragging: boolean;
  clickRef: React.RefObject<HTMLDivElement>;
  dragRef: (element: HTMLElement | null) => void;
  draggableId: string;
  currentRect: Konva.Rect | null;
}): JSX.Element => {
  const [transformState, setTransform] = useState(`translate(0px, 0px)`);

  const getTranslate = (transform: Transform | undefined): string => {
    if (transform) {
      return `translate(${transform?.x}px, ${transform?.y}px)`;
    } else {
      return `translate(0px, 0px)`;
    }
  };

  const containerStyle = {
    width: 200,
    height: "fit-content",
    backgroundColor: currentRect?.attrs?.fill,
    position: "absolute",
    top: position.y,
    left: position.x,
    zIndex: 1,
    transform: transformState,
    display: isDragging ? "block" : "none",
  } as React.CSSProperties;

  // useEffect(() => {
  //   setTransform(getTranslate(transform));
  //   console.log(rectRef);
  //   setId(rectRef?.current?.attrs.id);
  // }, [transform, position, clickRef, rectRef]);

  dragRef(clickRef.current);
  return ReactDOM.createPortal(
    <section className="draggable" ref={clickRef} style={containerStyle}>
      <h1>{currentRect?.attrs.id}</h1>
    </section>,
    document.getElementById("drag-target") as HTMLDivElement
  );
};

export default DragPlace;
