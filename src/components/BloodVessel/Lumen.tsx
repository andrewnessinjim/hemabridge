"use client";

import React from "react";
import { CanvasContext } from "../Canvas";

const LUMEN_ORDER = -10;
const LUMEN_COLOR = "hsl(353 70% 30%)";

export default function Lumen() {
  const canvasContextValue = React.useContext(CanvasContext);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(({ ctx, canvasWidth, canvasHeight }) => {
      ctx.fillStyle = LUMEN_COLOR;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }, LUMEN_ORDER);

    return unregister;
  }, [canvasContextValue]);
  return <React.Fragment />;
}
