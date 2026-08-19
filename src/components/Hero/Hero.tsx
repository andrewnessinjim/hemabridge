import * as React from "react";

import styles from "./Hero.module.scss";
import HeroContent from "./HeroContent";
import Hemabridge from "../Hemabridge";

function Hero() {
  return (
    <div className={`${styles.wrapper} siteWideContainer`}>
      <HeroContent />
      <Hemabridge />
    </div>
  );
}

export default Hero;
