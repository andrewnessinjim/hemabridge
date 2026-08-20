"use client";

import * as React from "react";

export const CLOT_SITE_X_FRACTION = 0.5;
export const CLOT_WALL_SIDE: "top" | "bottom" = "top";

export type ClotContextValue = {
  isClotting: boolean;
};

export const ClotContext = React.createContext<ClotContextValue>({
  isClotting: false,
});

type Props = {
  isClotting: boolean;
  children: React.ReactNode;
};

export function ClotContextProvider({ isClotting, children }: Props) {
  const value = React.useMemo<ClotContextValue>(
    () => ({ isClotting }),
    [isClotting],
  );

  return <ClotContext.Provider value={value}>{children}</ClotContext.Provider>;
}
