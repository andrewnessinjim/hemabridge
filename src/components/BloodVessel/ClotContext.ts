import React from "react";

export const CLOT_SITE_X_FRACTION = 0.5;
export const CLOT_WALL_SIDE: "top" | "bottom" = "top";

export type ClotContextValue = {
  isClotting: boolean;
};

export const ClotContext = React.createContext<ClotContextValue>({
  isClotting: false,
});
