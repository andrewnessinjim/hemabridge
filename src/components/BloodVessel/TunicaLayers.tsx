"use client";

import React from "react";
import { CanvasContext } from "../Canvas";
import { vesselRatios } from "./constants";
import { ClotContext, CLOT_SITE_X_FRACTION } from "./ClotContextProvider";

import { range } from "lodash";
import { normalize } from "../../app/utils";
import createNoiseGenerator from "../../vendor/noise.vendor";
import { TUNICA_COLORS } from "@/colors";

const NUM_OF_POINTS = 300;
const Y_VARIATION = 10;
const BREACH_WIDTH = 110;
const MEDIA_BREACH_WIDTH = 60;

const { simplex2 } = createNoiseGenerator(800);

export default function TunicaLayers() {
  const canvasContextValue = React.useContext(CanvasContext);
  const ratios = vesselRatios;
  const { isClotting } = React.useContext(ClotContext);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        const totalParts =
          2 * (ratios.intima + ratios.media + ratios.adventitia) +
          ratios.lumen;
        const unitHeight = canvasHeight / totalParts;

        const breachCenterX = CLOT_SITE_X_FRACTION * canvasWidth;
        const breachRange: [number, number] | null = isClotting
          ? [breachCenterX - BREACH_WIDTH / 2, breachCenterX + BREACH_WIDTH / 2]
          : null;
        const mediaBreachRange: [number, number] | null = isClotting
          ? [
              breachCenterX - MEDIA_BREACH_WIDTH / 2,
              breachCenterX + MEDIA_BREACH_WIDTH / 2,
            ]
          : null;

        const tunicaLayers = [
          {
            height: ratios.adventitia * unitHeight,
            color: TUNICA_COLORS.adventitia,
            drawTexture: drawAdventitiaTexture,
          },
          {
            height: ratios.media * unitHeight,
            color: TUNICA_COLORS.media,
            drawTexture: drawMediaTexture,
          },
          {
            height: ratios.intima * unitHeight,
            color: TUNICA_COLORS.intima,
            drawTexture: drawIntimaTexture,
          },
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

        function splitAroundGap(
          layerPoints: { x: number; y: number }[],
          gapRange: [number, number] | null,
        ) {
          if (!gapRange) return [layerPoints];
          const [gapStart, gapEnd] = gapRange;
          return [
            layerPoints.filter((point) => point.x < gapStart),
            layerPoints.filter((point) => point.x > gapEnd),
          ];
        }

        function drawLayer(
          layerPoints: { x: number; y: number }[],
          layer: { height: number; color: string },
          yOffset: number,
          gapRange: [number, number] | null = null,
        ) {
          const segments = splitAroundGap(layerPoints, gapRange);

          segments.forEach((segmentPoints) => {
            if (segmentPoints.length < 2) return;

            ctx.beginPath();
            const [firstPoint, ...restPoints] = segmentPoints;
            ctx.moveTo(firstPoint.x, firstPoint.y + yOffset);
            for (const point of restPoints) {
              ctx.lineTo(point.x, point.y + yOffset);
            }
            ctx.strokeStyle = layer.color;
            ctx.lineWidth = layer.height;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.stroke();
          });
        }

        // Thick dot nuclei, like the endothelial cell row in the reference
        // diagram.
        function drawIntimaTexture(
          layerPoints: { x: number; y: number }[],
          yOffset: number,
          height: number,
          gapRange: [number, number] | null = null,
        ) {
          const stride = 6;
          for (let i = 0; i < layerPoints.length - stride; i += stride) {
            const { x, y } = layerPoints[i];
            const nextX = layerPoints[i + stride].x;
            const cellWidth = nextX - x;
            const cellMidX = x + cellWidth / 2;

            if (
              gapRange &&
              cellMidX > gapRange[0] &&
              cellMidX < gapRange[1]
            ) {
              continue;
            }

            const cy = y + yOffset;

            ctx.beginPath();
            ctx.ellipse(
              x + cellWidth / 2,
              cy,
              cellWidth * 0.3,
              height * 0.3,
              0,
              0,
              Math.PI * 2,
            );
            ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
            ctx.fill();
          }
        }

        // Small dots scattered across the layer, in a few offset rows so
        // they don't read as an obvious grid.
        function drawAdventitiaTexture(
          layerPoints: { x: number; y: number }[],
          yOffset: number,
          height: number,
          gapRange: [number, number] | null = null,
        ) {
          const stride = 10;
          const rowOffsets = [-height * 0.3, 0, height * 0.3];

          layerPoints.forEach((point, i) => {
            if (i % stride !== 0) return;

            rowOffsets.forEach((rowOffset, rowIndex) => {
              const staggeredX =
                point.x + (rowIndex % 2 === 0 ? 0 : stride * 2);

              ctx.beginPath();
              ctx.arc(staggeredX, point.y + yOffset + rowOffset, 2, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
              ctx.fill();
            });
          });
        }

        // A few wavy fibers running through the layer, with dots placed
        // along each one.
        function drawMediaTexture(
          layerPoints: { x: number; y: number }[],
          yOffset: number,
          height: number,
          gapRange: [number, number] | null = null,
        ) {
          const fiberOffsets = [-height * 0.3, 0, height * 0.3];
          const dotStride = 20;

          const fiberSegments = splitAroundGap(layerPoints, gapRange);

          fiberOffsets.forEach((fiberOffset) => {
            fiberSegments.forEach((segmentPoints) => {
              if (segmentPoints.length < 2) return;

              ctx.beginPath();
              segmentPoints.forEach((point, i) => {
                const py = point.y + yOffset + fiberOffset;
                if (i === 0) ctx.moveTo(point.x, py);
                else ctx.lineTo(point.x, py);
              });
              ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
              ctx.lineWidth = 1;
              ctx.stroke();
            });

            layerPoints.forEach((point, i) => {
              if (i % dotStride !== 0) return;
              if (
                gapRange &&
                point.x > gapRange[0] &&
                point.x < gapRange[1]
              ) {
                return;
              }
              ctx.beginPath();
              ctx.arc(point.x, point.y + yOffset + fiberOffset, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
              ctx.fill();
            });
          });
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

          // The wound breaches the intima fully and the media partially
          // (a narrower gap), only on the top wall.
          const isInnermostLayer = i === tunicaLayers.length - 1;
          const isMediaLayer = i === 1;
          const topGapRange = isInnermostLayer
            ? breachRange
            : isMediaLayer
              ? mediaBreachRange
              : null;

          drawLayer(points, layer, currentOffset, topGapRange);
          drawLayer(bottomPoints, layer, -currentOffset);

          layer.drawTexture(points, currentOffset, layer.height, topGapRange);
          layer.drawTexture(bottomPoints, -currentOffset, layer.height);
        });
      },
    );

    return unregister;
  }, [canvasContextValue, ratios, isClotting]);
  return <React.Fragment />;
}
