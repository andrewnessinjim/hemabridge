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

type Props = {
  /** "pair" (default) draws both vessel walls with the lumen gap between
   * them, and is the only mode that supports the clot breach. "top"/"bottom"
   * draw a single wall stretched to fill the whole canvas height, for use
   * as a standalone section divider. */
  mode?: "top" | "bottom" | "pair";
  grayscale?: boolean;
};

export default function TunicaLayers({ mode = "pair", grayscale = false }: Props) {
  const canvasContextValue = React.useContext(CanvasContext);
  const ratios = vesselRatios;
  const { isClotting } = React.useContext(ClotContext);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        ctx.save();
        if (grayscale) {
          ctx.filter = "grayscale(1)";
        }
        // Standalone top/bottom dividers are meant to sit quietly in the
        // background, not compete with the vivid clot-simulation "pair"
        // rendering.
        if (mode !== "pair") {
          ctx.globalAlpha = 0.25;
        }

        // "pair" divides the canvas between two walls with a lumen gap in
        // between; standalone "top"/"bottom" have no lumen or second wall
        // to share space with, so the three layers fill the full height.
        // In "pair" mode the lumen gap easily absorbs the Y_VARIATION noise
        // wave, but a standalone wall has zero slack, so its innermost
        // layer needs that headroom reserved or the noise can push it past
        // the canvas edge and clip it.
        const totalParts =
          mode === "pair"
            ? 2 * (ratios.intima + ratios.media + ratios.adventitia) +
              ratios.lumen
            : ratios.intima + ratios.media + ratios.adventitia;
        const availableHeight =
          mode === "pair" ? canvasHeight : canvasHeight - Y_VARIATION;
        const unitHeight = availableHeight / totalParts;

        const breachCenterX = CLOT_SITE_X_FRACTION * canvasWidth;
        const breachRange: [number, number] | null =
          mode === "pair" && isClotting
            ? [
                breachCenterX - BREACH_WIDTH / 2,
                breachCenterX + BREACH_WIDTH / 2,
              ]
            : null;
        const mediaBreachRange: [number, number] | null =
          mode === "pair" && isClotting
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

        // Draws one wall's worth of layers (adventitia -> media -> intima),
        // stacking outward from initialOffset. direction is +1 for the top
        // wall (offsets grow downward from the top points) and -1 for the
        // bottom wall (offsets grow upward from the bottom points).
        function drawWall(
          layerPoints: { x: number; y: number }[],
          direction: 1 | -1,
          gapRange: [number, number] | null,
          mediaGapRange: [number, number] | null,
          initialOffset: number,
        ) {
          let currentOffset = initialOffset;
          tunicaLayers.forEach((layer, i) => {
            if (i > 0) {
              currentOffset +=
                tunicaLayers[i - 1].height / 2 + layer.height / 2;
            }

            const isInnermostLayer = i === tunicaLayers.length - 1;
            const isMediaLayer = i === 1;
            const thisGapRange = isInnermostLayer
              ? gapRange
              : isMediaLayer
                ? mediaGapRange
                : null;

            const yOffset = direction * currentOffset;
            drawLayer(layerPoints, layer, yOffset, thisGapRange);
            layer.drawTexture(layerPoints, yOffset, layer.height, thisGapRange);
          });
        }

        if (mode === "pair") {
          // Both walls share the same offset progression (0-seeded), which
          // is why the outermost (adventitia) layer straddles the canvas
          // edge rather than sitting flush against it.
          drawWall(points, 1, breachRange, mediaBreachRange, 0);
          drawWall(bottomPoints, -1, null, null, 0);
        } else if (mode === "top") {
          // Seed the offset so the outer edge of the adventitia layer sits
          // flush at y=0 instead of straddling it.
          drawWall(points, 1, null, null, tunicaLayers[0].height / 2);
        } else {
          drawWall(bottomPoints, -1, null, null, tunicaLayers[0].height / 2);
        }

        ctx.restore();
      },
    );

    return unregister;
  }, [canvasContextValue, ratios, isClotting, mode, grayscale]);
  return <React.Fragment />;
}
