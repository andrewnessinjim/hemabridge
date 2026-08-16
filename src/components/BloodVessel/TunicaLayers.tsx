"use client";

import React from "react";
import { CanvasContext } from "../Canvas";

import { range } from "lodash";
import { normalize } from "../../app/utils";
import createNoiseGenerator from "../../vendor/noise.vendor";

const tunicaExterna = { height: 1.5, color: "hsl(32deg 35% 55%)" };
const tunicaMedia = { height: 3, color: "hsl(355deg 55% 48%)" };
const tunicaIntima = { height: 1, color: "hsl(340deg 60% 90%)" };

const tunicaLayers = [tunicaExterna, tunicaMedia, tunicaIntima];

const NUM_OF_POINTS = 300;
const Y_VARIATION = 10;

const { simplex2 } = createNoiseGenerator(800);

export default function TunicaLayers() {
  const canvasContextValue = React.useContext(CanvasContext);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        const points: { x: number; y: number }[] = [];
        range(NUM_OF_POINTS).forEach((i) => {
          const x = normalize(i, 0, NUM_OF_POINTS - 1, 0, canvasWidth);
          const y = normalize(
            simplex2(x / 100, totalTime / 10),
            -1,
            1,
            10,
            10 + Y_VARIATION,
          );

          points.push({ x, y });
        });

        function drawLayer(
          layerPoints: { x: number; y: number }[],
          layer: { height: number; color: string },
          yOffset: number,
        ) {
          ctx.beginPath();
          const [firstPoint, ...restPoints] = layerPoints;
          ctx.moveTo(firstPoint.x, firstPoint.y + yOffset);
          for (const point of restPoints) {
            ctx.lineTo(point.x, point.y + yOffset);
          }
          ctx.strokeStyle = layer.color;
          ctx.lineWidth = layer.height;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.stroke();
        }

        const bottomPoints: { x: number; y: number }[] = [];
        range(NUM_OF_POINTS).forEach((i) => {
          const x = normalize(i, 0, NUM_OF_POINTS - 1, 0, canvasWidth);
          const y = normalize(
            simplex2(x / 100 + 1000, totalTime / 10),
            -1,
            1,
            canvasHeight - 10 - Y_VARIATION,
            canvasHeight - 10,
          );

          bottomPoints.push({ x, y });
        });

        let currentOffset = 0;
        tunicaLayers.forEach((layer, i) => {
          if (i > 0) {
            currentOffset += tunicaLayers[i - 1].height / 2 + layer.height / 2;
          }

          drawLayer(points, layer, currentOffset);
          drawLayer(bottomPoints, layer, -currentOffset);
        });
      },
    );

    return unregister;
  }, [canvasContextValue]);
  return <React.Fragment />;
}
