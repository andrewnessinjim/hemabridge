"use client";

import * as React from "react";
import Canvas from "../Canvas";
import styles from "./BloodVessel.module.scss";
import TunicaLayers from "./TunicaLayers";
import WBCFlow from "./WBCFlow";
import RBCFlow from "./RBCFlow";
import PlateletFlow from "./PlateletFlow";
import FibrinFlow from "./FibrinFlow";
import HemabridgeFlow from "./HemabridgeFlow";
import Lumen from "./Lumen";
import { VesselRatiosContext, vesselRatios } from "./VesselRatios";
import { ClotContext } from "./ClotContext";
import CTAButton from "../CTAButton";

function BloodVessel() {
  const [isClotting, setIsClotting] = React.useState(false);

  return (
    <VesselRatiosContext.Provider value={vesselRatios}>
      <ClotContext.Provider value={{ isClotting }}>
        <div className={styles.trigger}>
          <CTAButton
            size="small"
            disabled={isClotting}
            onClick={() => setIsClotting(true)}
          >
            {isClotting ? "Clot forming..." : "Simulate Clot"}
          </CTAButton>
        </div>
        <div className={styles.container}>
          <Canvas className={styles.canvas}>
            {/* <Box /> */}
            <Lumen />
            <TunicaLayers />
            <RBCFlow />
            <WBCFlow />
            <PlateletFlow />
            <FibrinFlow />
            <HemabridgeFlow />
          </Canvas>
        </div>
      </ClotContext.Provider>
    </VesselRatiosContext.Provider>
  );
}

export default BloodVessel;
