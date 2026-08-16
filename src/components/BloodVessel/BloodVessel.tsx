import * as React from "react";
import Canvas from "../Canvas";
import styles from "./BloodVessel.module.css";
import TunicaLayers from "./TunicaLayers";


function BloodVessel() {

  return (
    <Canvas className={styles.canvas}>
      {/* <Box /> */}
      <TunicaLayers />
    </Canvas>
  );
}

export default BloodVessel;
