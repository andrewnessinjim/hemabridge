import React from "react";

export type VesselRatios = {
  lumen: number;
  intima: number;
  media: number;
  adventitia: number;
};

export const vesselRatios: VesselRatios = {
  lumen: 12,
  intima: 1,
  media: 4,
  adventitia: 3,
};

export const VesselRatiosContext =
  React.createContext<VesselRatios>(vesselRatios);

/**
 * Fraction (of canvasHeight) of the true top wall/lumen boundary, as
 * actually rendered by TunicaLayers. Half the outermost (adventitia)
 * layer's stroke renders off-canvas above y=0, so the rendered boundary
 * sits above the naive (intima+media+adventitia)/totalParts sum by half
 * an adventitia-layer's height.
 */
export function getWallInnerEdgeFraction(ratios: VesselRatios) {
  const totalParts =
    2 * (ratios.intima + ratios.media + ratios.adventitia) + ratios.lumen;
  return (ratios.adventitia / 2 + ratios.media + ratios.intima) / totalParts;
}
