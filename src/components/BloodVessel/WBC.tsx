"use client";

import React from "react";
import { CanvasContext } from "@/components/Canvas";
import { random, range } from "lodash";
import { convertPolarToCartesian, normalize } from "@/app/utils";

import createNoiseGenerator from "../../vendor/noise.vendor";

const NUM_WBC_POINTS = 200;
const WMC_NOISE_ZOOM = 4;

const NUM_NUCLEUS_POINTS = 20;
const NUCLEUS_NOISE_ZOOM = 2;

function generateBlobPoints(
  numPoints: number,
  minDistance: number,
  maxDistance: number,
  noiseZoom: number,
) {
  const { simplex2 } = createNoiseGenerator(random(1000));
  const blobPoints = range(NUM_WBC_POINTS).map((i) => {
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

export default function WBC() {
  const canvasContextValue = React.useContext(CanvasContext);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const wbc = {
      points: generateBlobPoints(NUM_WBC_POINTS, 20, 24, WMC_NOISE_ZOOM),
      nucleusPoints: generateBlobPoints(
        NUM_NUCLEUS_POINTS,
        6,
        8,
        NUCLEUS_NOISE_ZOOM,
      ),
      nucleusAngle: random(0, 2 * Math.PI),
      nucleusDistance: random(4, 10),
    };
    const { register } = canvasContextValue;

    const unregister = register(({ ctx }) => {
      ctx.beginPath();
      const [firstPoint, ...restPoints] = wbc.points;
      ctx.moveTo(firstPoint.x + 100, firstPoint.y + 100);

      restPoints.forEach((point) => {
        ctx.lineTo(point.x + 100, point.y + 100);
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
        nucleusFirstPoint.x + 100 + nucleusX,
        nucleusFirstPoint.y + 100 + nucleusY,
      );
      restNucleusPoints.forEach((point) => {
        ctx.lineTo(point.x + 100 + nucleusX, point.y + 100 + nucleusY);
      });
      ctx.fillStyle = "hsl(207deg 55% 55%)";
      ctx.fill();
    }, 1);

    return unregister;
  }, [canvasContextValue]);
  return <React.Fragment />;
}
