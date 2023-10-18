import React from "react";

type HuePosition = "top" | "left" | "right" | "bottom";
type Hue = {
    position?: HuePosition,
    height?: number,
    width?: number
}
interface ColorPickerProps extends Omit<React.CanvasHTMLAttributes<any>, "onChange">{
    height?: number;
    width?: number,
    value?: string,
    space?: number,
    backgroundColor?: string
    hue?: Hue,
    onChange(value: {rgb: string, hex: string}): void
}

export type {ColorPickerProps, Hue}