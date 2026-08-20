"use client";

import * as React from "react";

export const CLOT_SITE_X_FRACTION = 0.5;
export const CLOT_WALL_SIDE: "top" | "bottom" = "top";
// Once this many particles have piled up at the site, the clot stops
// pulling in new ones — particles already flowing keep flowing, they just
// stop being drawn in.
export const MAX_CAPTURED_PARTICLES = 10;

export type ClotContextValue = {
  isClotting: boolean;
  /** Call when a particle is about to be captured. Returns true if the
   * capture is allowed (under the limit, and increments the shared
   * count), false if the clot has already accumulated enough particles. */
  registerCapture: () => boolean;
};

export const ClotContext = React.createContext<ClotContextValue>({
  isClotting: false,
  registerCapture: () => true,
});

type Props = {
  isClotting: boolean;
  children: React.ReactNode;
};

export function ClotContextProvider({ isClotting, children }: Props) {
  const capturedCountRef = React.useRef(0);

  const registerCapture = React.useCallback(() => {
    if (capturedCountRef.current >= MAX_CAPTURED_PARTICLES) {
      return false;
    }
    capturedCountRef.current += 1;
    return true;
  }, []);

  const value = React.useMemo<ClotContextValue>(
    () => ({ isClotting, registerCapture }),
    [isClotting, registerCapture],
  );

  return <ClotContext.Provider value={value}>{children}</ClotContext.Provider>;
}
