"use client";

import React from "react";
import { CanvasContext } from "../Canvas";
import { LUMEN_COLOR } from "@/colors";

const LUMEN_ORDER = -10;

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
