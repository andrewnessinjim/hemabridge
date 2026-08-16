"use client";

import React from "react";
import { CanvasContext } from "@/components/Canvas";
import { VesselRatiosContext } from "./VesselRatios";
import { random, range } from "lodash";
import {
  convertPolarToCartesian,
  normalize,
  clampedNormalize,
} from "@/app/utils";

import createNoiseGenerator from "../../vendor/noise.vendor";

const NUM_WBC = 5;
const NUM_WBC_POINTS = 200;
const WMC_NOISE_ZOOM = 4;

const NUM_NUCLEUS_POINTS = 20;
const NUCLEUS_NOISE_ZOOM = 2;

const WBC_RADIUS = 24;
const Y_VARIATION = 0.0005;
const ROTATION_SPEED = 0.005; // radians of spin per pixel of forward movement

const { simplex2: driftNoise } = createNoiseGenerator(4321);

function generateBlobPoints(
  numPoints: number,
  minDistance: number,
  maxDistance: number,
  noiseZoom: number,
) {
  const { simplex2 } = createNoiseGenerator(random(1000));
  const blobPoints = range(numPoints).map((i) => {
    const angleRadians = normalize(i, 0, numPoints, 0, 2 * Math.PI);

    // Gives a circular dimension for the noise instead of a linear one
    const noiseX = Math.cos(angleRadians) * noiseZoom;
    const noiseY = Math.sin(angleRadians) * noiseZoom;
    const distance = normalize(
      simplex2(noiseX, noiseY),
      -1,
      1,
      minDistance,
      maxDistance,
    );

    const [x, y] = convertPolarToCartesian([angleRadians, distance]);
    return { x, y };
  });

  return blobPoints;
}

function createWBC(cyFraction: number) {
  const initCx = random(-45, -90);
  return {
    points: generateBlobPoints(NUM_WBC_POINTS, 20, 24, WMC_NOISE_ZOOM),
    nucleusPoints: generateBlobPoints(
      NUM_NUCLEUS_POINTS,
      6,
      8,
      NUCLEUS_NOISE_ZOOM,
    ),
    nucleusAngle: random(0, 2 * Math.PI),
    nucleusDistance: random(4, 10),
    cx: initCx,
    cyFraction,
    velocity: random(1, 5, true),
    rotation: random(0, 2 * Math.PI),
  };
}

type WBCState = ReturnType<typeof createWBC>;

export default function WBC() {
  const canvasContextValue = React.useContext(CanvasContext);
  const ratios = React.useContext(VesselRatiosContext);

  const totalParts =
    2 * (ratios.intima + ratios.media + ratios.adventitia) + ratios.lumen;
  const wallFraction =
    (ratios.intima + ratios.media + ratios.adventitia) / totalParts;
  const lumenMinFraction = wallFraction;
  const lumenMaxFraction = 1 - wallFraction;

  const WBCsRef = React.useRef(
    range(NUM_WBC).map(() =>
      createWBC(random(lumenMinFraction, lumenMaxFraction)),
    ),
  );

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        function drawWBC(wbc: WBCState, cx: number, cy: number) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(wbc.rotation);

          ctx.beginPath();
          const [firstPoint, ...restPoints] = wbc.points;
          ctx.moveTo(firstPoint.x, firstPoint.y);

          restPoints.forEach((point) => {
            ctx.lineTo(point.x, point.y);
          });

          ctx.fillStyle = "hsl(90deg 100% 100%)";
          ctx.fill();

          ctx.beginPath();
          const [nucleusFirstPoint, ...restNucleusPoints] = wbc.nucleusPoints;
          const [nucleusX, nucleusY] = convertPolarToCartesian([
            wbc.nucleusAngle,
            wbc.nucleusDistance,
          ]);
          ctx.moveTo(
            nucleusFirstPoint.x + nucleusX,
            nucleusFirstPoint.y + nucleusY,
          );
          restNucleusPoints.forEach((point) => {
            ctx.lineTo(point.x + nucleusX, point.y + nucleusY);
          });
          ctx.fillStyle = "hsl(207deg 55% 55%)";
          ctx.fill();

          ctx.restore();
        }

        WBCsRef.current.forEach((wbc) => {
          drawWBC(wbc, wbc.cx, wbc.cyFraction * canvasHeight);
          wbc.cx += wbc.velocity;
          wbc.rotation += wbc.velocity * ROTATION_SPEED;

          const driftMin = Math.max(
            wbc.cyFraction - Y_VARIATION,
            lumenMinFraction,
          );
          const driftMax = Math.min(
            wbc.cyFraction + Y_VARIATION,
            lumenMaxFraction,
          );

          wbc.cyFraction = clampedNormalize(
            driftNoise(wbc.cx / 100, totalTime / 100),
            -1,
            1,
            driftMin,
            driftMax,
          );

          if (wbc.cx > canvasWidth + WBC_RADIUS) {
            wbc.cx = random(-45, -90);
            wbc.cyFraction = random(lumenMinFraction, lumenMaxFraction);
          }
        });
      },
      1,
    );

    return unregister;
  }, [canvasContextValue, lumenMinFraction, lumenMaxFraction]);
  return <React.Fragment />;
}
