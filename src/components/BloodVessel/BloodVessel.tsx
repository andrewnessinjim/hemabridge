"use client";

import * as React from "react";
import Canvas from "../Canvas";
import styles from "./BloodVessel.module.scss";
import TunicaLayers from "./TunicaLayers";
import WBCFlow from "./WBCFlow";
import RBCFlow from "./RBCFlow";
import Lumen from "./Lumen";
import { VesselRatiosContext, vesselRatios } from "./VesselRatios";

function BloodVessel() {
  return (
    <VesselRatiosContext.Provider value={vesselRatios}>
      <div className={styles.container}>
        <Canvas className={styles.canvas}>
          {/* <Box /> */}
          <Lumen />
          <TunicaLayers />
          <RBCFlow />
          <WBCFlow />
        </Canvas>
      </div>
    </VesselRatiosContext.Provider>
  );
}

export default BloodVessel;
