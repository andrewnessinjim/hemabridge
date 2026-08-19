import _ from "lodash";
import React from "react";
import { CanvasContext } from "../Canvas";
import { VesselRatiosContext } from "./VesselRatios";
import { clampedNormalize } from "@/app/utils";
import createNoiseGenerator from "../../vendor/noise.vendor";

type Props = {
  drawParticle: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
  count: number;
  radius: number;
};

const Y_VARIATION = 0.0005;

const { simplex2 } = createNoiseGenerator(800);

export default function Flow({ drawParticle, count, radius }: Props) {
  const canvasContextValue = React.useContext(CanvasContext);
  const ratios = React.useContext(VesselRatiosContext);

  const totalParts =
    2 * (ratios.intima + ratios.media + ratios.adventitia) + ratios.lumen;
  const wallFraction =
    (ratios.intima + ratios.media + ratios.adventitia) / totalParts;
  const lumenMinFraction = wallFraction;
  const lumenMaxFraction = 1 - wallFraction;

  console.log({lumenMinFraction, lumenMaxFraction})

  const particlesRef = React.useRef(
    _.range(count).map(() => {
      return {
        x: _.random(-45, -90),
        cyFraction: _.random(lumenMinFraction, lumenMaxFraction),
        velocity: _.random(1, 5, true),
      };
    }),
  );

  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        if (isInitialRender.current) {
          particlesRef.current.forEach((particle) => {
            particle.x = _.random(0, canvasWidth);
          });
          isInitialRender.current = false;
        }

        particlesRef.current.forEach((particle) => {
          drawParticle(ctx, particle.x, particle.cyFraction * canvasHeight);

          particle.x += particle.velocity;
          const driftMin = Math.max(
            particle.cyFraction - Y_VARIATION,
            lumenMinFraction,
          );
          const driftMax = Math.min(
            particle.cyFraction + Y_VARIATION,
            lumenMaxFraction,
          );

          particle.cyFraction = clampedNormalize(
            simplex2(particle.x / 100, totalTime / 100),
            -1,
            1,
            driftMin,
            driftMax,
          );

          if (particle.x > canvasWidth + radius) {
            particle.x = _.random(-45, -90);
            particle.cyFraction = _.random(lumenMinFraction, lumenMaxFraction);
          }
        });
      },
    );

    return unregister;
  }, [
    canvasContextValue,
    lumenMinFraction,
    lumenMaxFraction,
    drawParticle,
    radius,
  ]);

  return <React.Fragment />;
}
