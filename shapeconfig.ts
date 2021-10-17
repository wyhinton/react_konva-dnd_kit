export interface ShapeConfig extends NodeConfig {
  fill?: string;
  fillPatternImage?: HTMLImageElement;
  fillPatternX?: number;
  fillPatternY?: number;
  fillPatternOffset?: Vector2d;
  fillPatternOffsetX?: number;
  fillPatternOffsetY?: number;
  fillPatternScale?: Vector2d;
  fillPatternScaleX?: number;
  fillPatternScaleY?: number;
  fillPatternRotation?: number;
  fillPatternRepeat?: string;
  fillLinearGradientStartPoint?: Vector2d;
  fillLinearGradientStartPointX?: number;
  fillLinearGradientStartPointY?: number;
  fillLinearGradientEndPoint?: Vector2d;
  fillLinearGradientEndPointX?: number;
  fillLinearGradientEndPointY?: number;
  fillLinearGradientColorStops?: Array<number | string>;
  fillRadialGradientStartPoint?: Vector2d;
  fillRadialGradientStartPointX?: number;
  fillRadialGradientStartPointY?: number;
  fillRadialGradientEndPoint?: Vector2d;
  fillRadialGradientEndPointX?: number;
  fillRadialGradientEndPointY?: number;
  fillRadialGradientStartRadius?: number;
  fillRadialGradientEndRadius?: number;
  fillRadialGradientColorStops?: Array<number | string>;
  fillEnabled?: boolean;
  fillPriority?: string;
  stroke?: string | CanvasGradient;
  strokeWidth?: number;
  fillAfterStrokeEnabled?: boolean;
  hitStrokeWidth?: number | string;
  strokeScaleEnabled?: boolean;
  strokeHitEnabled?: boolean;
  strokeEnabled?: boolean;
  lineJoin?: LineJoin;
  lineCap?: LineCap;
  sceneFunc?: (con: Context, shape: Shape) => void;
  hitFunc?: (con: Context, shape: Shape) => void;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: Vector2d;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  shadowEnabled?: boolean;
  shadowForStrokeEnabled?: boolean;
  dash?: number[];
  dashOffset?: number;
  dashEnabled?: boolean;
  perfectDrawEnabled?: boolean;
}
