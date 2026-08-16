import React from "react";

import useRequestAnimationFrameLoop from "./useRequestAnimationFrameLoop";

type DrawParams = {
  ctx: CanvasRenderingContext2D;
  dpr: number;
  canvasWidth: number;
  canvasHeight: number;
  deltaTime: number;
  totalTime: number;
};

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  draw: (params: DrawParams) => void;
};

function Canvas({ draw, ...delegated }: CanvasProps) {
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const boundingBoxRef = React.useRef<DOMRect | null>(null);
  const dprRef = React.useRef<number | null>(null);

  const startTimeRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number | null>(null);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    startTimeRef.current = performance.now();
    lastTimeRef.current = performance.now();

    if (!canvasRef.current) {
      return;
    }

    // Do initial setup work
    const ctx = canvasRef.current.getContext("2d");
    ctxRef.current = ctx;

    // Register event handlers for width/height/dpr:
    function handleResize() {
      if (!canvasRef.current) {
        return;
      }

      const dpr = window.devicePixelRatio;
      const bb = canvasRef.current.getBoundingClientRect();
      dprRef.current = dpr;
      boundingBoxRef.current = bb;

      canvasRef.current.setAttribute("width", String(bb.width * dpr));
      canvasRef.current.setAttribute("height", String(bb.height * dpr));
      ctx?.scale(dpr, dpr);
    }

    // Set initial values:
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Call the draw function on every frame:
  useRequestAnimationFrameLoop(() => {
    if (
      !ctxRef.current ||
      !dprRef.current ||
      !boundingBoxRef.current ||
      lastTimeRef.current === null ||
      startTimeRef.current === null
    ) {
      return;
    }

    const ctx = ctxRef.current;
    const dpr = dprRef.current;
    const boundingBox = boundingBoxRef.current;

    const now = Date.now();
    const deltaTime = Math.min(now - lastTimeRef.current, 250) / 1000;
    const totalTime = (now - startTimeRef.current) / 1000;
    lastTimeRef.current = now;

    draw({
      ctx,
      dpr,
      canvasWidth: boundingBox.width,
      canvasHeight: boundingBox.height,
      deltaTime,
      totalTime,
    });
  });

  return <canvas {...delegated} ref={canvasRef} />;
}

export default Canvas;
