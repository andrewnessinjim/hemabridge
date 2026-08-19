"use client";

import React from "react";
import { CanvasContext } from "../Canvas";
import { VesselRatiosContext } from "./VesselRatios";
import { random, range } from "lodash";
import createNoiseGenerator from "../../vendor/noise.vendor";
import { clampedNormalize } from "../../app/utils";
import { RBC_COLORS } from "@/colors";

const NUM_RBC = 50;
const RIM_RADIUS = 18;
const DEPRESSION_RADIUS = 12;
const Y_VARIATION = 0.0005;

const { simplex2 } = createNoiseGenerator(800);

export default function RBC() {
  const canvasContextValue = React.useContext(CanvasContext);
  const ratios = React.useContext(VesselRatiosContext);

  const totalParts =
    2 * (ratios.intima + ratios.media + ratios.adventitia) + ratios.lumen;
  const wallFraction =
    (ratios.intima + ratios.media + ratios.adventitia) / totalParts;
  const lumenMinFraction = wallFraction;
  const lumenMaxFraction = 1 - wallFraction;

  const RBCsRef = React.useRef(
    range(NUM_RBC).map(() => {
      const initCx = random(-45, -90);
      return {
        initCx,
        cx: initCx,
        cyFraction: random(lumenMinFraction, lumenMaxFraction),
        velocity: random(1, 5, true),
      };
    }),
  );
  const hasScatteredRef = React.useRef(false);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        function drawRBC(cx: number, cy: number) {
          ctx.beginPath();
          ctx.arc(cx, cy, RIM_RADIUS, 0, Math.PI * 2);
          const outerGradient = ctx.createRadialGradient(
            cx,
            cy,
            DEPRESSION_RADIUS,
            cx,
            cy,
            RIM_RADIUS,
          );
          outerGradient.addColorStop(0, RBC_COLORS.rimInner);
          outerGradient.addColorStop(0.5, RBC_COLORS.rimMid);
          outerGradient.addColorStop(1, RBC_COLORS.rimOuter);
          ctx.fillStyle = outerGradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(cx, cy, 12, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            cx,
            cy,
            6,
            cx,
            cy,
            DEPRESSION_RADIUS,
          );
          gradient.addColorStop(0, RBC_COLORS.depressionCenter);
          gradient.addColorStop(0.99, RBC_COLORS.depressionEdge);
          gradient.addColorStop(1, RBC_COLORS.depressionEdge);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        if (!hasScatteredRef.current) {
          RBCsRef.current.forEach((rbc) => {
            rbc.cx = random(0, canvasWidth);
          });
          hasScatteredRef.current = true;
        }

        RBCsRef.current.forEach((rbc) => {
          drawRBC(rbc.cx, rbc.cyFraction * canvasHeight);
          rbc.cx += rbc.velocity;
          const driftMin = Math.max(
            rbc.cyFraction - Y_VARIATION,
            lumenMinFraction,
          );
          const driftMax = Math.min(
            rbc.cyFraction + Y_VARIATION,
            lumenMaxFraction,
          );

          rbc.cyFraction = clampedNormalize(
            simplex2(rbc.cx / 100, totalTime / 100),
            -1,
            1,
            driftMin,
            driftMax,
          );

          if (rbc.cx > canvasWidth + RIM_RADIUS) {
            rbc.cx = random(-45, -90);
            rbc.cyFraction = random(lumenMinFraction, lumenMaxFraction);
          }
        });
      },
    );

    return unregister;
  }, [canvasContextValue, lumenMinFraction, lumenMaxFraction]);
  return <React.Fragment />;
}
