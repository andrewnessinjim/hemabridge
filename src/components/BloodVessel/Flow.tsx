import _ from "lodash";
import React from "react";
import { CanvasContext } from "../Canvas";
import {
  VesselRatiosContext,
  getWallInnerEdgeFraction,
} from "./VesselRatios";
import { ClotContext, CLOT_SITE_X_FRACTION } from "./ClotContextProvider";
import { clampedNormalize } from "@/app/utils";
import createNoiseGenerator from "../../vendor/noise.vendor";

type Props<T> = {
  drawParticle: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    velocity: number,
    state: T,
    totalTime: number,
  ) => void;
  createParticleState: () => T;
  count: number;
  radius: number;
  drift: number;
  order?: number;
  /** When true, particles near the clot site get pulled in and pile up once clotting is triggered. */
  clottable?: boolean;
  /** Radius (px) within which a particle gets captured by the clot site. */
  captureRadius?: number;
  /** How quickly a captured particle eases toward its settled pile position, per frame (0-1). */
  settleEase?: number;
  /** Transforms a particle's state once it's captured, so drawParticle can render its clot look. */
  onCapture?: (state: T) => T;
};

const { simplex2 } = createNoiseGenerator(800);

type ParticleState<T> = {
  x: number;
  cyFraction: number;
  velocity: number;
  state: T;
  captured?: boolean;
  settleX?: number;
  settleCyFraction?: number;
};

const PILE_SPREAD_X = 26;
const PILE_DEPTH_MIN = 2;
const PILE_DEPTH_MAX = 22;

export default function Flow<T>({
  drawParticle,
  createParticleState,
  count,
  radius,
  drift,
  order = 0,
  clottable = false,
  captureRadius = radius * 2.5,
  settleEase = 0.1,
  onCapture,
}: Props<T>) {
  const canvasContextValue = React.useContext(CanvasContext);
  const ratios = React.useContext(VesselRatiosContext);
  const clotContextValue = React.useContext(ClotContext);

  const totalParts =
    2 * (ratios.intima + ratios.media + ratios.adventitia) + ratios.lumen;
  const wallFraction =
    (ratios.intima + ratios.media + ratios.adventitia) / totalParts;
  const lumenMinFraction = wallFraction;
  const lumenMaxFraction = 1 - wallFraction;
  const wallInnerEdgeFraction = getWallInnerEdgeFraction(ratios);

  const particlesRef = React.useRef<ParticleState<T>[]>([]);

  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(
      ({ ctx, canvasWidth, canvasHeight, totalTime }) => {
        const radiusFraction = radius / canvasHeight;
        // Once clotting starts, clottable particles are allowed to drift
        // all the way to the true wall edge (rather than the more
        // conservative default lumen boundary) so they can actually reach
        // the capture site at the rupture.
        const flowLumenMinFraction =
          clottable && clotContextValue.isClotting
            ? wallInnerEdgeFraction
            : lumenMinFraction;
        const adjustedLumenMin = flowLumenMinFraction + radiusFraction;
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
            totalTime,
          );

          if (clottable && (particle.captured || clotContextValue.isClotting)) {
            if (!particle.captured) {
              const siteX = CLOT_SITE_X_FRACTION * canvasWidth;
              const siteY = wallInnerEdgeFraction * canvasHeight;
              const particleY = particle.cyFraction * canvasHeight;
              const distance = Math.hypot(siteX - particle.x, siteY - particleY);

              if (distance < captureRadius) {
                particle.captured = true;
                particle.settleX = siteX + _.random(-PILE_SPREAD_X, PILE_SPREAD_X);
                particle.settleCyFraction =
                  (siteY + _.random(PILE_DEPTH_MIN, PILE_DEPTH_MAX)) / canvasHeight;
                particle.state = onCapture ? onCapture(particle.state) : particle.state;
              }
            }

            if (particle.captured) {
              particle.x += ((particle.settleX ?? particle.x) - particle.x) * settleEase;
              particle.cyFraction +=
                ((particle.settleCyFraction ?? particle.cyFraction) -
                  particle.cyFraction) *
                settleEase;
              return;
            }
          }

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
    wallInnerEdgeFraction,
    drawParticle,
    createParticleState,
    radius,
    count,
    drift,
    order,
    clottable,
    captureRadius,
    settleEase,
    onCapture,
    clotContextValue.isClotting,
  ]);

  return <React.Fragment />;
}
