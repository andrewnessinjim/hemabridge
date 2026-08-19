import _ from "lodash";
import React from "react";
import { CanvasContext } from "../Canvas";
import { VesselRatiosContext } from "./VesselRatios";
import { clampedNormalize } from "@/app/utils";
import createNoiseGenerator from "../../vendor/noise.vendor";

type Props<T> = {
  drawParticle: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    velocity: number,
    state: T,
  ) => void;
  createParticleState: () => T;
  count: number;
  radius: number;
  drift: number;
  order?: number;
};

const { simplex2 } = createNoiseGenerator(800);

type ParticleState<T> = {
  x: number;
  cyFraction: number;
  velocity: number;
  state: T;
};

export default function Flow<T>({
  drawParticle,
  createParticleState,
  count,
  radius,
  drift,
  order = 0,
}: Props<T>) {
  const canvasContextValue = React.useContext(CanvasContext);
  const ratios = React.useContext(VesselRatiosContext);

  const totalParts =
    2 * (ratios.intima + ratios.media + ratios.adventitia) + ratios.lumen;
  const wallFraction =
    (ratios.intima + ratios.media + ratios.adventitia) / totalParts;
  const lumenMinFraction = wallFraction;
  const lumenMaxFraction = 1 - wallFraction;

  const particlesRef = React.useRef<ParticleState<T>[]>([]);

  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        const radiusFraction = radius / canvasHeight;
        const adjustedLumenMin = lumenMinFraction + radiusFraction;
        const adjustedLumenMax = lumenMaxFraction - radiusFraction;

        if (isInitialRender.current) {
          particlesRef.current = _.range(count).map(() => {
            return {
              x: _.random(0, canvasWidth),
              cyFraction: _.random(adjustedLumenMin, adjustedLumenMax),
              velocity: _.random(1, 5, true),
              state: createParticleState(),
            };
          });
          isInitialRender.current = false;
        }

        particlesRef.current.forEach((particle) => {
          drawParticle(
            ctx,
            particle.x,
            particle.cyFraction * canvasHeight,
            particle.velocity,
            particle.state,
          );

          particle.x += particle.velocity;

          const noiseValue = simplex2(particle.x / 100, totalTime / 100);
          const driftDelta = clampedNormalize(
            noiseValue,
            -1,
            1,
            -drift,
            +drift,
          );
          const driftedCyFraction = particle.cyFraction + driftDelta;

          particle.cyFraction = _.clamp(
            driftedCyFraction,
            adjustedLumenMin,
            adjustedLumenMax,
          );

          if (particle.x > canvasWidth + radius) {
            particle.x = _.random(-45, -90);
            particle.cyFraction = _.random(adjustedLumenMin, adjustedLumenMax);
            particle.state = createParticleState();
          }
        });
      },
      order,
    );

    return unregister;
  }, [
    canvasContextValue,
    lumenMinFraction,
    lumenMaxFraction,
    drawParticle,
    createParticleState,
    radius,
    count,
    drift,
    order,
  ]);

  return <React.Fragment />;
}
