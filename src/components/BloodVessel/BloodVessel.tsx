"use client";

import * as React from "react";
import Canvas from "../Canvas";
import styles from "./BloodVessel.module.css";
import TunicaLayers from "./TunicaLayers";
import RBC from "./RBC";
import WBC from "./WBC";
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
          <RBC />
          <WBC />
        </Canvas>
      </div>
    </VesselRatiosContext.Provider>
  );
}

export default BloodVessel;
