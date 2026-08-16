import React from "react";

const useRequestAnimationFrameLoop = (callback: () => void, isRunning = true) => {
  const animationFrameId = React.useRef<number | null>(null);
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    if (!isRunning) {
      return;
    }

    const tick = () => {
      savedCallback.current();
      animationFrameId.current = window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRunning]);

  return animationFrameId;
};

export default useRequestAnimationFrameLoop;
