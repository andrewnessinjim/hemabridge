"use client";

import * as React from "react";
import Canvas, { CanvasContext } from "../Canvas";
import styles from "./Hemabridge.module.scss";
import drawHemabridge, {
  createHemabridgeState,
  activateHemabridge,
  MAX_HEMABRIDGE_RADIUS,
  HemabridgeState,
} from "../BloodVessel/drawHemabridge";

// Seconds since capture: past the 2s pulse, partway through the 5s grow
// window, so the arms sit at roughly half length.
const MID_GROW_ELAPSED = 4.5;
// Far past the pulse+grow window, so it's permanently in its settled,
// fully-bridged look.
const SETTLED_ELAPSED = 1000;

type Particle = {
  offsetX: number;
  offsetY: number;
  scale: number;
  state: HemabridgeState;
  // If set, elapsedSinceClot is re-pinned to this every frame instead of
  // being left to grow with real time — keeps the particle frozen in one
  // state rather than animating.
  pinnedElapsed?: number;
};

function buildParticles(): Particle[] {
  const restingState = createHemabridgeState();
  restingState.radius = MAX_HEMABRIDGE_RADIUS;

  const midGrowState = activateHemabridge(createHemabridgeState());
  midGrowState.radius = MAX_HEMABRIDGE_RADIUS;

  const settledState = activateHemabridge(createHemabridgeState());
  settledState.radius = MAX_HEMABRIDGE_RADIUS;

  return [
    {
      offsetX: 420,
      offsetY: 260,
      scale: 7,
      state: settledState,
      pinnedElapsed: SETTLED_ELAPSED,
    },
    {
      offsetX: 110,
      offsetY: 130,
      scale: 4,
      state: midGrowState,
      pinnedElapsed: MID_GROW_ELAPSED,
    },
    {
      offsetX: 140,
      offsetY: 400,
      scale: 3,
      state: restingState,
    },
  ];
}

function HemabridgeDrawing() {
  const canvasContextValue = React.useContext(CanvasContext);
  const particlesRef = React.useRef(buildParticles());

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(({ ctx, totalTime }) => {
      particlesRef.current.forEach(
        ({ offsetX, offsetY, scale, state, pinnedElapsed }) => {
          if (pinnedElapsed !== undefined) {
            state.capturedAt = totalTime - pinnedElapsed;
          }

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

export default function Hemabridge() {
  return (
    <div className={styles.wrapper}>
      <Canvas className={styles.canvas}>
        <HemabridgeDrawing />
      </Canvas>
    </div>
  );
}
