import * as React from "react";
import Image from "next/image";

import styles from "./Hero.module.scss";
import HeroContent from "./HeroContent";

function Hero() {
  return (
    <div className={`${styles.wrapper} siteWideContainer`}>
      <HeroContent />
      <Image
        src="/hemabridges/hemabridge-single.png"
        alt="A Hemabridge nanoparticle"
        width={240}
        height={240}
        unoptimized
        className={`${styles.heroImage} ${styles.imageSingle}`}
      />
      <Image
        src="/hemabridges/hemabridge-pair.png"
        alt="Two Hemabridge nanoparticles, one resting and one mid-formation"
        width={430}
        height={320}
        unoptimized
        className={`${styles.heroImage} ${styles.imagePair}`}
      />
      <Image
        src="/hemabridges/hemabridge-trio.png"
        alt="Three Hemabridge nanoparticles in different states, from resting to fully bridged"
        width={650}
        height={500}
        unoptimized
        className={`${styles.heroImage} ${styles.imageTrio}`}
      />
    </div>
  );
}

export default Hero;
