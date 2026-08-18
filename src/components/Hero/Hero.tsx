import * as React from "react";
import BloodVessel from "@/components/BloodVessel";

import styles from "./Hero.module.css";
import HeroContent from "./HeroContent";

function Hero() {
  return (
    <div className={`${styles.wrapper} siteWideContainer`}>
      <HeroContent />
      <BloodVessel />
    </div>
  );
}

export default Hero;
