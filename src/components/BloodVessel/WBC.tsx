"use client";

import React from "react";
import { CanvasContext } from "@/components/Canvas";

export default function WBC() {
  const canvasContextValue = React.useContext(CanvasContext);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        
      },
    );

    return unregister;
  });
  return <React.Fragment />;
}
