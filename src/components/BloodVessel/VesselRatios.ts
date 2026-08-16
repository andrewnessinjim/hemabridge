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
