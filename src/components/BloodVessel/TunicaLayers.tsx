"use client";

import React from "react";
import { CanvasContext } from "../Canvas";
import { VesselRatiosContext } from "./VesselRatios";

import { range } from "lodash";
import { normalize } from "../../app/utils";
import createNoiseGenerator from "../../vendor/noise.vendor";

const NUM_OF_POINTS = 300;
const Y_VARIATION = 10;

const { simplex2 } = createNoiseGenerator(800);

export default function TunicaLayers() {
  const canvasContextValue = React.useContext(CanvasContext);
  const ratios = React.useContext(VesselRatiosContext);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        const totalParts =
          2 * (ratios.intima + ratios.media + ratios.adventitia) +
          ratios.lumen;
        const unitHeight = canvasHeight / totalParts;

        const tunicaLayers = [
          { height: ratios.adventitia * unitHeight, color: "hsl(32deg 35% 55%)" },
          { height: ratios.media * unitHeight, color: "hsl(355deg 55% 40%)" },
          { height: ratios.intima * unitHeight, color: "hsl(340deg 60% 70%)" },
        ];

        const points: { x: number; y: number }[] = [];
        range(NUM_OF_POINTS).forEach((i) => {
          const x = normalize(i, 0, NUM_OF_POINTS - 1, 0, canvasWidth);
          const y = normalize(
            simplex2(x / 100, totalTime / 10),
            -1,
            1,
            0,
            Y_VARIATION,
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
            canvasHeight - Y_VARIATION,
            canvasHeight,
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
  }, [canvasContextValue, ratios]);
  return <React.Fragment />;
}
