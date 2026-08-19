"use client";

import * as React from "react";
import Canvas, { CanvasContext } from "../Canvas";
import styles from "./HemabridgeTablet.module.scss";
import drawHemabridge, { HemabridgeState } from "../BloodVessel/drawHemabridge";
import {
  createMidGrowParticleState,
  createSettledParticleState,
  MID_GROW_ELAPSED,
  SETTLED_ELAPSED,
} from "./hemabridgeStates";

type Particle = {
  offsetX: number;
  offsetY: number;
  scale: number;
  state: HemabridgeState;
  pinnedElapsed: number;
};

// A scaled-down pair (settled + mid-grow) of the desktop 3-particle
// cluster, for the tablet-width range where there isn't room for all 3.
function buildParticles(): Particle[] {
  return [
    {
      offsetX: 273,
      offsetY: 165,
      scale: 4.5,
      state: createSettledParticleState(),
      pinnedElapsed: SETTLED_ELAPSED,
    },
    {
      offsetX: 72,
      offsetY: 85,
      scale: 2.5,
      state: createMidGrowParticleState(),
      pinnedElapsed: MID_GROW_ELAPSED,
    },
  ];
}

function HemabridgeTabletDrawing() {
  const canvasContextValue = React.useContext(CanvasContext);
  const particlesRef = React.useRef(buildParticles());

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(({ ctx, totalTime }) => {
      particlesRef.current.forEach(
        ({ offsetX, offsetY, scale, state, pinnedElapsed }) => {
          state.capturedAt = totalTime - pinnedElapsed;

          ctx.save();
          ctx.translate(offsetX, offsetY);
          ctx.scale(scale, scale);
          drawHemabridge(ctx, 0, 0, 0, state, totalTime);
          ctx.restore();
        },
      );
    });

    return unregister;
  }, [canvasContextValue]);

  return <React.Fragment />;
}

export default function HemabridgeTablet() {
  return (
    <div className={styles.wrapper}>
      <Canvas className={styles.canvas}>
        <HemabridgeTabletDrawing />
      </Canvas>
    </div>
  );
}
