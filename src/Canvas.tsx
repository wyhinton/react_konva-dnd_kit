import DragPlace from "./DragPlace";
import Konva from "konva";
import React, { useRef, useState } from "react";
import { Group, Layer, Rect, Stage, Text } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RectConfig } from "konva/lib/shapes/Rect";
import { useDraggable } from "@dnd-kit/core";

const Canvas = ({
  setDraggingId,
  rects,
}: {
  setDraggingId: (id: string) => void;
  rects: Partial<RectConfig>[];
}): JSX.Element => {
  const greens = [
    "#A4DE02",
    "#76BA1B",
    "#4C9A2A",
    "#1E5631",
    "#68BB59",
    "#ACDF87",
  ];

  const stageProps = {
    width: window.innerWidth * 0.8,
    height: 800,
  };

  const [hoveredId, setHoveredId] = useState("");
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentRect, setCurrentRect] = useState<Konva.Rect | null>(null);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: currentRect?.attrs.id ?? rects[0].id,
    data: { rect: currentRect },
  });

  const refForDragOverlay = useRef<HTMLDivElement>(null);

  const onRectMouseDown = (e: KonvaEventObject<MouseEvent>): void => {
    console.log(e);
    const { pageX, pageY } = e.evt;
    setDragPos({ x: pageX, y: pageY });
    setIsDragging(true);
    if (refForDragOverlay.current) {
      refForDragOverlay.current.click();
    }
    console.log(e.target.attrs.id);
    setDraggingId(e.target.attrs.id);
  };

  const onRectDragStart = (e: KonvaEventObject<DragEvent>) => {
    console.log("STARTED RECT DRAG");
    setIsDragging(true);
  };
  const onRectDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setIsDragging(false);
  };
  const onRectDragMove = (e: KonvaEventObject<DragEvent>) => {
    setDragPos({ x: e.evt.pageX, y: e.evt.pageY });
  };
  const onRectMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    setHoveredId(e.target.attrs.id);
  };

  //transform our blocks in Konva rect configs
  const functionalRects = rects.map((rect) => {
    const onMouseDown = onRectMouseDown;
    const onDragStart = onRectDragStart;
    const onDragEnd = onRectDragEnd;
    const onMouseEnter = onRectMouseEnter;
    const onDragMove = onRectDragMove;

    return {
      ...rect,
      onDragMove,
      onDragStart,
      onDragEnd,
      onMouseEnter,
      onMouseDown,
    };
  });

  const containerStyle = {
    border: "1px solid red",
  } as React.CSSProperties;

  return (
    <>
      <div {...attributes} {...listeners} style={containerStyle}>
        <Stage {...stageProps}>
          <Layer
            dragBoundFunc={(e) => {
              console.log(e);
              return { x: 0, y: 0 };
            }}
          >
            {functionalRects.map((rect, i) => (
              <Group
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                key={rect.id + "_group"}
              >
                <Widget
                  rect={rect}
                  setRect={(rect) => {
                    setCurrentRect(rect);
                  }}
                />
                <Text
                  hitFunction={(context: any) => {
                    return null;
                  }}
                  draggable={false}
                  fontSize={20}
                  text={rect.id}
                  wrap="char"
                  align="center"
                  width={rect.width}
                ></Text>
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
      <DragPlace
        id={"drag-container"}
        isDragging={isDragging}
        position={dragPos}
        clickRef={refForDragOverlay}
        dragRef={setNodeRef}
        currentRect={currentRect}
        draggableId={currentRect?.attrs.id}
      />
    </>
  );
};
export default Canvas;

const Widget = ({
  rect,
  setRect,
}: {
  rect: Partial<RectConfig>;
  setRect: (ref: Konva.Rect) => void;
}) => {
  const rectRef = React.useRef<Konva.Rect>(null);
  const {
    width,
    height,
    fill,
    onMouseDown,
    onDragStart,
    onDragEnd,
    onMouseEnter,
    onDragMove,
    draggable,
    id,
  } = rect;
  return (
    <Rect
      x={0}
      y={0}
      id={id}
      width={width}
      height={height}
      fill={fill}
      draggable={draggable}
      onClick={(e) => {
        console.log(e);
      }}
      onMouseDown={(e) => {
        onMouseDown(e);
        console.log(e);
        setRect(e.target as Konva.Rect);
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={onMouseEnter}
      onDragMove={onDragMove}
      ref={rectRef}
      dragBoundFunc={(e) => {
        return { x: rect.x ?? 0, y: rect.y ?? 0 };
      }}
    />
  );
};
