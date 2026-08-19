import * as React from "react";

import styles from "./Hero.module.css";
import HeroContent from "./HeroContent";

function Hero() {
  return (
    <div className={`${styles.wrapper} siteWideContainer`}>
      <HeroContent />
    </div>
  );
}

export default Hero;
