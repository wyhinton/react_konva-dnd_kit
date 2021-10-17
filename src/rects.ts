import Packer, { Block } from "./Packer";
import { RectConfig } from "konva/lib/shapes/Rect";

const stageProps = {
  width: window.innerWidth * 0.8,
  height: 800,
};

const greens = [
  "#A4DE02",
  "#76BA1B",
  "#4C9A2A",
  "#1E5631",
  "#68BB59",
  "#ACDF87",
];
const makeBlocks = (count: number, colWidth: number): Block[] => {
  let blocks = [];
  const widths = [1, 2, 3, 4, 5];
  for (let index = 0; index < count; index++) {
    const block = {
      w: randomElement(widths) * colWidth,
      h: 74,
    };
    blocks.push(block);
  }
  return blocks;
};

const packer = new Packer(stageProps.width, stageProps.height, 10);
const blocks = makeBlocks(25, stageProps.width / 10);
packer.fit(blocks);

const makeRects = (b: Block[]) => {
  let set = b.map((block, i) => {
    if (block.fit) {
      const rect = {
        cornerRadius: 5,
        key: `rect_${i}`,
        id: `rect_${i}`,
        x: block.fit.x,
        y: block.fit.y,
        width: block.w,
        height: block.h,
        fill: randomElement(greens),
        draggable: true,
      };
      return rect;
    } else {
      return undefined;
    }
  });
  return set.filter((rect) => rect) as Partial<RectConfig>[];
};

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const rects = makeRects(blocks);
export default rects;
