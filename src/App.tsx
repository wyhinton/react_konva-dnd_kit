import Canvas from "./Canvas";
import DropZone from "./DropZone";
import Konva from "konva";
import React, { useState } from "react";
import rects from "./rects";
import { Action, action, useLocalStore } from "easy-peasy";
import { RectConfig } from "konva/lib/shapes/Rect";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import "./App.css";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
export type DroppableData =
  | Shape<ShapeConfig>
  | Konva.Stage
  | Konva.Rect
  | null;

export interface CardModel {
  dragging: string;
  setDragging: Action<CardModel, string>;
  rects: Partial<RectConfig>[];
}
function App() {
  const [dragComplete, setDragComplete] = useState(false);
  const [state, actions] = useLocalStore<CardModel>(
    () => ({
      dragging: "none",
      setDragging: action((state, id) => {
        state.dragging = id;
      }),
      rects: rects,
    }),
    [],
    () => ({
      devTools: false,
    })
  );

  const onDragStart = (e: DragStartEvent): void => {
    console.log("GOT DRAG START");
    setDragComplete(false);
  };

  const onDragEnd = (e: DragEndEvent) => {
    console.log("GOT DRAG END");
    // console.log(e.active.)
    setDragComplete(true);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
    >
      <section className="App">
        <DropZone droppedId={state.dragging} dragComplete={dragComplete} />
        <Canvas
          setDraggingId={(id: string) => {
            actions.setDragging(id);
          }}
          rects={rects}
        />
      </section>
    </DndContext>
  );
}

export default App;
