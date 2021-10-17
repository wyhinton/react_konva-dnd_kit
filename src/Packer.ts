export interface Block {
  [x: string]: any;
  w: number;
  h: number;
  fit?: Node;
}

export interface Node {
  x: number;
  y: number;
  w: number;
  h: number;
  used?: boolean;
  down?: Node;
  right?: Node;
}

export interface Piece {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Fit {
  x: number;
  y: number;
}

export class Packer {
  readonly w: number;
  readonly h: number;
  readonly root: Node;
  readonly gutter: number;

  constructor(w: number, h: number, gutter?: number) {
    this.w = w;
    this.h = h;
    this.gutter = gutter ?? 5;
    this.root = { x: 0, y: 0, w: w, h: h, used: false };
  }
  fit(blocks: Block[]): void {
    let n, node, block;
    for (n = 0; n < blocks.length; n++) {
      block = blocks[n];
      block.w += this.gutter;
      block.h += this.gutter;
      if ((node = this.findNode(this.root, block.w, block.h)))
        block.fit = this.splitNode(node, block.w, block.h);
    }
  }
  findNode(root: Node, w: number, h: number): Node | null {
    if (root.used && root.right && root.down)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if (w <= root.w && h <= root.h) return root;
    else return null;
  }
  splitNode(node: Node, w: number, h: number): Node {
    node.used = true;
    // node.down = {
    //   x: node.x,
    //   y: node.y + h + this.gutter,
    //   w: node.w,
    //   h: node.h - h,
    // };
    // node.right = {
    //   x: node.x + w + this.gutter,
    //   y: node.y,
    //   w: node.w - w,
    //   h: h,
    // };
    node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
    node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
    return node;
  }
}

export default Packer;
