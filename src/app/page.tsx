"use client";

import React from "react";
import Canvas from "./Canvas";
import styles from "./page.module.css";

const tunicaAdventitia = { height: 6, color: "hsl(29deg 37% 66%)" };
const tunicaMedia = { height: 6, color: "hsl(0 59% 64%)" };
const tunicaIntima = { height: 6, color: "hsl(29 37% 66%)" }

const tunicaLayers = [tunicaAdventitia, tunicaMedia, tunicaIntima];

function App() {
  const tunicaAdventitiaRef = React.useRef({
    x: 0,
    y: 0,
    height: 6,
  });

  const tunicaMediaRef = React.useRef({
    x: 0,
    y: 6,
    height: 6,
  });

  const tunicaIntimaRef = React.useRef({
    x: 0,
    y: 12,
    height: 6,
  });

  const draw = React.useCallback(
    ({
      ctx,
      width,
      height,
      deltaTime,
    }: {
      ctx: CanvasRenderingContext2D;
      width: number;
      height: number;
      deltaTime: number;
    }) => {
      ctx.clearRect(0, 0, width, height);

      let currentY = 0;
      tunicaLayers.forEach(tunicaLayer => {
        ctx.fillStyle = tunicaLayer.color;
        ctx.fillRect(
          0,
          currentY,
          width,
          tunicaLayer.height
        )

        currentY += tunicaLayer.height
      })
    },
    [],
  );

  return <Canvas className={styles.canvas} draw={draw} />;
}

export default App;
