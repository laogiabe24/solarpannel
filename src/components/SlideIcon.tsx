import { resolveAssetPath } from "../utils/assets";

interface SlideIconProps {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function SlideIcon({ src, x, y, width, height }: SlideIconProps) {
  return (
    <img
      className="slide-icon"
      data-animate="item-icon"
      src={resolveAssetPath(src)}
      alt=""
      decoding="async"
      draggable={false}
      style={{ left: x, top: y, width, height }}
    />
  );
}