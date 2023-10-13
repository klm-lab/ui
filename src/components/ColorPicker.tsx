import React, { useEffect, useRef } from "react";
import type { ColorPickerProps } from "../types";
import { initColors } from "../util/colorPicker";


const ColorPicker = (props: ColorPickerProps) => {

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) initColors(canvasRef.current, props);
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};

export { ColorPicker };
