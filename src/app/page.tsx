"use client";

import React from "react";
import Canvas from "./Canvas";
import styles from "./page.module.css";
import { range } from "lodash";
import { normalize } from "./utils";
import createNoiseGenerator from "../vendor/noise.vendor";

const { simplex2 } = createNoiseGenerator(800);

const tunicaExterna = { height: 3, color: "hsl(32deg 35% 55%)" };
const tunicaMedia = { height: 6, color: "hsl(355deg 55% 48%)" };
const tunicaIntima = { height: 2, color: "hsl(340deg 60% 90%)" };

const tunicaLayers = [tunicaExterna, tunicaMedia, tunicaIntima];
const startTime = performance.now();
function App() {
  const draw = React.useCallback(
    ({
      ctx,
      canvasWidth,
      canvasHeight,
      deltaTime,
    }: {
      ctx: CanvasRenderingContext2D;
      canvasWidth: number;
      canvasHeight: number;
      deltaTime: number;
    }) => {
      const NUM_OF_POINTS = 300;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const totalTime = (performance.now() - startTime) / 1000;
      ctx.beginPath();
      range(NUM_OF_POINTS).forEach((i) => {
        const x = normalize(i, 0, NUM_OF_POINTS - 1, 0, canvasWidth);
        const y = normalize(simplex2(x/100, totalTime/10), -1, 1, 10, 20);

        if(i === 0){
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.strokeStyle = "hsl(32deg 35% 55%)";
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.stroke();


      // let currentY = 0;
      // tunicaLayers.forEach((tunicaLayer) => {
      //   ctx.fillStyle = tunicaLayer.color;
      //   ctx.fillRect(0, currentY, canvasWidth, tunicaLayer.height);

      //   currentY += tunicaLayer.height;
      // });

      // currentY = canvasHeight;
      // tunicaLayers.reverse().forEach(tunicaLayer => {
      //   ctx.fillStyle = tunicaLayer.color;
      //   ctx.fillRect(
      //     0,
      //     currentY - tunicaLayer.height,
      //     canvasWidth,
      //     tunicaLayer.height
      //   )

      //   currentY -= tunicaLayer.height
      // })
    },
    [],
  );

  return <Canvas className={styles.canvas} draw={draw} />;
}

export default App;
