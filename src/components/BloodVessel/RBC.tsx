"use client";

import React from "react";
import { CanvasContext } from "../Canvas";
import { VesselRatiosContext } from "./VesselRatios";
import { random, range } from "lodash";
import createNoiseGenerator from "../../vendor/noise.vendor";
import { normalize } from "../../app/utils";

const NUM_RBC = 30;
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
          outerGradient.addColorStop(0, "hsl(353 70% 20%)");
          outerGradient.addColorStop(0.5, "hsl(353 89.8% 24%)");
          outerGradient.addColorStop(1, "hsl(353 89.8% 20%)");
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
          gradient.addColorStop(0, "hsl(353 70% 35%)");
          gradient.addColorStop(0.99, "hsl(353 89.8% 24%)");
          gradient.addColorStop(1, "hsl(353 89.8% 24%)");
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        RBCsRef.current.forEach((rbc) => {
          drawRBC(rbc.cx, rbc.cyFraction * canvasHeight);
          rbc.cx += rbc.velocity;
          rbc.cyFraction = normalize(
            simplex2(rbc.cx / 100, totalTime / 100),
            -1,
            1,
            rbc.cyFraction - Y_VARIATION,
            rbc.cyFraction + Y_VARIATION,
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
