import { ColorPickerProps, Hue } from "../types";

export const DEFAULT_HUE_SIZE = 30;
export const DEFAULT_POSITION = "right";


// const gradientH = context.createLinearGradient(0, 0, width, 0);
// gradientH.addColorStop(0, "rgb(255, 0, 0)"); // red
// gradientH.addColorStop(1/6, "rgb(255, 255, 0)"); // yellow
// gradientH.addColorStop(2/6, "rgb(0, 255, 0)"); // green
// gradientH.addColorStop(3/6, "rgb(0, 255, 255)");
// gradientH.addColorStop(4/6, "rgb(0, 0, 255)"); // blue
// gradientH.addColorStop(5/6, "rgb(255, 0, 255)");
// gradientH.addColorStop(1, "rgb(255, 0, 0)"); // red
// context.fillStyle = gradientH;
// context.fillRect(0, 0, width, height);
const hue = [[255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [255, 0, 255], [255, 0, 0]];
const drawGradient = (ctx: CanvasRenderingContext2D,
                      color: string, x: number, y: number, width: number, height: number,
                      horizontal: boolean
) => {
  const whiteGrd = ctx.createLinearGradient(x, y, horizontal ? width : 0, horizontal ? 0 : height);
  const blackGrd = ctx.createLinearGradient(x, y, horizontal ? 0 : width, horizontal ? height : 0);
  //Color
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  // White
  whiteGrd.addColorStop(0, "rgba(255,255,255,1)");
  whiteGrd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = whiteGrd;
  ctx.fillRect(x, y, width, height);
  // Black
  blackGrd.addColorStop(0, "rgba(0,0,0,0)");
  blackGrd.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = blackGrd;
  ctx.fillRect(x, y, width, height);

};


const getColor = (ctx: CanvasRenderingContext2D, { offsetY, offsetX }: MouseEvent) => {
  const { data } = ctx.getImageData(offsetX, offsetY, 1, 1);
  return {
    rgb: "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")",
    hex: "#" + [data[0], data[1], data[2]].map(c => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("")
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getHue = (ctx: CanvasRenderingContext2D, width: number, height: number, horizontal: boolean) => {
  const hueGradient = ctx.createLinearGradient(0, 0, horizontal ? width : 0, horizontal ? 0 : height);
  for (let i = 0; i <= 6; i++) {
    hueGradient.addColorStop(i / 6, "rgb(" + hue[i][0] + ", " + hue[i][1] + ", " + hue[i][2] + ")");
  }
  return hueGradient;
};

const parseParamsByPosition = (canvasWidth: number, canvasHeight: number, space: number, hue: Hue) => {
  const { position, height, width } = hue;
  switch (position) {
    case "top": {
      const hueHeight = height || DEFAULT_HUE_SIZE;
      return {
        hueX: space,
        hueY: space,
        hueHeight,
        hueWidth: canvasWidth - (space * 2),
        gradientX: space,
        gradientY: hueHeight + (space * 2),
        gradientHeight: canvasHeight - hueHeight - (space * 3),
        gradientWidth: (canvasWidth - (space * 2))
      };
    }
    case "left": {
      const hueWidth = width || DEFAULT_HUE_SIZE;
      return {
        hueX: space,
        hueY: space,
        hueHeight: canvasHeight - (space * 2),
        hueWidth: hueWidth,
        gradientX: hueWidth + (space * 2),
        gradientY: space,
        gradientHeight: canvasHeight - (space * 2) ,
        gradientWidth: canvasWidth - hueWidth - (space * 3)
      };
    }
    case "right": {
      const hueWidth = width || DEFAULT_HUE_SIZE;
      return {
        hueX: canvasWidth - hueWidth - space,
        hueY: space,
        hueHeight: canvasHeight - (space * 2),
        hueWidth,
        gradientX: space,
        gradientY: space,
        gradientHeight: canvasHeight - (space * 2),
        gradientWidth: canvasWidth - hueWidth - (space * 3)
      };
    }
    case "bottom": {
      const hueHeight = height || DEFAULT_HUE_SIZE;
      return {
        hueX: space,
        hueY: canvasHeight - hueHeight - (space),
        hueHeight,
        hueWidth: canvasWidth - (space * 2),
        gradientX: space,
        gradientY: space,
        gradientHeight: canvasHeight - hueHeight - (space * 3),
        gradientWidth: (canvasWidth - (space * 2))
      };
    }
    default: {
      const hueWidth = width || DEFAULT_HUE_SIZE;
      return {
        hueX: canvasWidth - hueWidth - space,
        hueY: space,
        hueHeight: canvasHeight - (space * 2),
        hueWidth,
        gradientX: space,
        gradientY: space,
        gradientHeight: canvasHeight - (space * 2),
        gradientWidth: canvasWidth - hueWidth - (space * 3)
      };
    }
  }
};

export const initColors = (canvas: HTMLCanvasElement, options: Required<ColorPickerProps>) => {
  const {
    width,
    height,
    onChange,
    value,
    hue,
    backgroundColor,
    space
  } = options;
  const { position } = hue || {};
  const HUE_POSITION = position || DEFAULT_POSITION;
  const horizontal = ["top", "bottom"].includes(HUE_POSITION);
  const {
    hueWidth,
    hueHeight,
    hueX,
    hueY,
    gradientX,
    gradientY,
    gradientWidth,
    gradientHeight
  } = parseParamsByPosition(width, height, space, hue);

 // console.log(parseParamsByPosition(width, height, space || 10, hue));

  const ctx = canvas.getContext("2d",
    { alpha: false, willReadFrequently: true }) as CanvasRenderingContext2D;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canvas.onclick = (e) => {
    console.log(e.offsetX, e.offsetY, width, );
    const XCheck = e.offsetX >= (width - ((space * 2) + (space / 2))) && e.offsetX < (width - space);
    const YCheck = e.offsetY >= (height - ((space * 2) + (space / 2))) && e.offsetY < (height - space);
    const grd = !horizontal ? XCheck : YCheck;
    if (grd) {
      drawGradient(ctx, getColor(ctx, e).rgb, gradientX, gradientY, gradientWidth, gradientHeight, horizontal);
    } else {
      onChange(getColor(ctx, e));
    }
  };

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  drawGradient(ctx, value, gradientX, gradientY, gradientWidth, gradientHeight, horizontal);
  // Draw hue
  ctx.fillStyle = getHue(ctx, width, height, horizontal);
  ctx.fillRect(hueX, hueY, hueWidth, hueHeight);


  // ctx.beginPath();
  // ctx.strokeStyle = '#cccccc';
  // ctx.lineWidth = 4;
  // ctx.strokeRect(0, 0, WIDTH, HEIGHT);

};