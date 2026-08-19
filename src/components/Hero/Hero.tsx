import * as React from "react";

import styles from "./Hero.module.scss";
import HeroContent from "./HeroContent";
import Hemabridge from "../Hemabridge";
import HemabridgeTablet from "../Hemabridge/HemabridgeTablet";

function Hero() {
  return (
    <div className={`${styles.wrapper} siteWideContainer`}>
      <HeroContent />
      <Hemabridge />
      <HemabridgeTablet />
    </div>
  );
}

export default Hero;
