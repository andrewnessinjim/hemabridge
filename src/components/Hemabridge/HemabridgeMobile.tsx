"use client";

import * as React from "react";
import Canvas, { CanvasContext } from "../Canvas";
import styles from "./HemabridgeMobile.module.scss";
import drawHemabridge from "../BloodVessel/drawHemabridge";
import { createMidGrowParticleState, MID_GROW_ELAPSED } from "./hemabridgeStates";

const SCALE = 5;

function HemabridgeMobileDrawing() {
  const canvasContextValue = React.useContext(CanvasContext);
  const stateRef = React.useRef(createMidGrowParticleState());

  React.useEffect(() => {
    if (!canvasContextValue) return;

    const { register } = canvasContextValue;

    const unregister = register(({ ctx, canvasWidth, canvasHeight, totalTime }) => {
      // Re-pinned every frame so it stays frozen mid-growth rather than
      // animating on with real time.
      stateRef.current.capturedAt = totalTime - MID_GROW_ELAPSED;

      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.scale(SCALE, SCALE);
      drawHemabridge(ctx, 0, 0, 0, stateRef.current, totalTime);
      ctx.restore();
    });

    return unregister;
  }, [canvasContextValue]);

  return <React.Fragment />;
}

export default function HemabridgeMobile() {
  return (
    <div className={styles.wrapper}>
      <Canvas className={styles.canvas}>
        <HemabridgeMobileDrawing />
      </Canvas>
    </div>
  );
}
