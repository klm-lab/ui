import { ColorPickerProps } from "../types";

export const initColors = (canvas: HTMLCanvasElement, options: ColorPickerProps) => {
  const { width, height } = options;
  const W = width || 300;
  const H = height || 300;
  canvas.height = H;
  canvas.width = W;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const grd = ctx.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, "red");
  grd.addColorStop(0.5, "blue");
  grd.addColorStop(1, "yellow");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

};