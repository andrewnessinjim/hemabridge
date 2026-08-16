import * as React from "react";
import Canvas from "../Canvas";
import styles from "./BloodVessel.module.css";
import TunicaLayers from "./TunicaLayers";
import RBC from "./RBC";

function BloodVessel() {
  return (
    <Canvas className={styles.canvas}>
      {/* <Box /> */}
      <TunicaLayers />
      <RBC />
    </Canvas>
  );
}

export default BloodVessel;
