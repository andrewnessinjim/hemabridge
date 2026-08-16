import * as React from "react";
import Canvas from "../Canvas";
import styles from "./BloodVessel.module.css";

function BloodVessel() {
  const draw = React.useCallback(
    ({
      ctx,
      canvasWidth,
      canvasHeight,
      deltaTime,
    }: {
      ctx: CanvasRenderingContext2D;
      canvasWidth: number;
      canvasHeight: number;
      deltaTime: number;
    }) => {
      ctx.clearRect(0,0,canvasWidth, canvasHeight)
      ctx.beginPath();
      ctx.rect(0, 0, 100, 100);
      ctx.fillStyle = "red";
      ctx.fill();
    },
    [],
  );

  return <Canvas className={styles.canvas} draw={draw} />;
}

export default BloodVessel;
