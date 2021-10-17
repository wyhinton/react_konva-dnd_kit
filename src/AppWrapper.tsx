import Canvas from "./Canvas";
import DropZone from "./DropZone";
import Konva from "konva";
import React, { useEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDndMonitor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import "./App.css";
import App from "./App";
export type DroppableData =
  | Shape<ShapeConfig>
  | Konva.Stage
  | Konva.Rect
  | null;

function AppWrapper() {
  const onDragStart = (e: DragStartEvent): void => {
    console.log("GOT DRAG START");
    console.log(e);
    console.log(`GOT DRAG START WITH ID ${e.active.id}`);
    // console.log(`GOT DRAG START WITH RECT ID ${e.active.data.current.}`);
  };

  const onDragEnd = (e: DragEndEvent) => {
    console.log("GOT DRAG END");
    console.log("GOT DRAG END");
    console.log("GOT DRAG END");
    console.log("GOT DRAG END");
    console.log("GOT DRAG END");
    console.log(e);
    // if ()
    // setdroppedId(e.active.id);
    // if (e.active.data?.current) {
    //   setdroppedRect(e.active.data?.current.targetRect as DroppableData);
    // }
  };
  return (
    <DndContext
      onDragStart={onDragStart}
      // collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
      // sensors={sensors}
    >
      <App />
    </DndContext>
  );
}

export default AppWrapper;
