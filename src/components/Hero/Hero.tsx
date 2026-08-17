import * as React from "react";
import BloodVessel from "@/components/BloodVessel";

import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={styles.container}>
      <BloodVessel />
    </div>
  );
}

export default Hero;
