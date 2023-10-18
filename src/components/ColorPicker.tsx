import React, { useEffect, useRef } from "react";
import type { ColorPickerProps } from "../types";
import { DEFAULT_HUE_SIZE, DEFAULT_POSITION, initColors } from "../util/colorPicker";


const ColorPicker = (props: ColorPickerProps) => {
  const {
    width = 600,
    height = 500,
    value = "rgb(255,0,0)",
    space = 0,
    backgroundColor = "white",
    onChange,
    hue = {
      width: DEFAULT_HUE_SIZE,
      height: DEFAULT_HUE_SIZE,
      position: DEFAULT_POSITION
    }, ...rest
  } = props;

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) initColors(canvasRef.current, {
      value, space, backgroundColor, hue, onChange, width, height
    } as Required<ColorPickerProps>);
  }, [canvasRef, value, space, backgroundColor, hue, onChange, width, height]);

  return <div>
    <canvas height={height} width={width} style={{ border: `solid 1px #ccc` }} ref={canvasRef} {...rest} />
    <input type="color" />
  </div>;
};

export { ColorPicker };
