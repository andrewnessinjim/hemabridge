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
import { ClotContextProvider } from "./ClotContextProvider";
import ClotTrigger from "./ClotTrigger";

function BloodVessel() {
  const [isClotting, setIsClotting] = React.useState(false);
  // Bumped on every "Simulate Clot" click, including restarts. Keying the
  // whole simulation subtree on it forces React to tear down and recreate
  // every particle flow and the clot context from scratch, rather than
  // trying to manually reset captured-particle state scattered across them.
  const [runId, setRunId] = React.useState(0);

  const handleSimulate = () => {
    setRunId((id) => id + 1);
    setIsClotting(true);
  };

  return (
    <ClotContextProvider key={runId} isClotting={isClotting}>
      <ClotTrigger onSimulate={handleSimulate} />
      <div className={styles.container}>
        <Canvas key={runId} className={styles.canvas}>
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
    </ClotContextProvider>
  );
}

export default BloodVessel;
