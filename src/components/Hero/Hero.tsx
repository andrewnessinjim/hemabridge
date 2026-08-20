"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import styles from "./Hero.module.scss";
import HeroContent from "./HeroContent";

const MotionImage = motion.create(Image);

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const fadeTransition = (delay: number) => ({
    duration: prefersReducedMotion ? 0 : 1.4,
    delay: prefersReducedMotion ? 0 : delay,
  });

  return (
    <div className={`${styles.wrapper} siteWideContainer`}>
      <HeroContent />
      <MotionImage
        src="/hemabridges/hemabridge-single.png"
        alt="A Hemabridge nanoparticle"
        width={240}
        height={240}
        unoptimized
        className={`${styles.heroImage} ${styles.imageSingle}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fadeTransition(0)}
      />
      <MotionImage
        src="/hemabridges/hemabridge-pair.png"
        alt="Two Hemabridge nanoparticles, one resting and one mid-formation"
        width={430}
        height={320}
        unoptimized
        className={`${styles.heroImage} ${styles.imagePair}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fadeTransition(0.15)}
      />
      <MotionImage
        src="/hemabridges/hemabridge-trio.png"
        alt="Three Hemabridge nanoparticles in different states, from resting to fully bridged"
        width={650}
        height={500}
        unoptimized
        className={`${styles.heroImage} ${styles.imageTrio}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fadeTransition(0.3)}
      />
    </div>
  );
}

export default Hero;
