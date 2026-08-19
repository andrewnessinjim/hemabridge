"use client";

import CTAButton from "../CTAButton";
import Spacer from "../Spacer";
import styles from "./HeroContent.module.scss";
import { motion } from "motion/react";

export default function HeroContent() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.tagline}>A helping hand at the site of injury.</h1>
      <Spacer size={4} />
      <p className={styles.text}>
        Meet <strong className={styles.hema}>Hema</strong>
        <strong className={styles.bridges}>bridges</strong> — engineered
        nanoparticles designed to work alongside platelets and support the
        body&apos;s natural mechanisms of hemostasis.
      </p>
      <Spacer size={6} />

      <CTAButton>Partner With Us</CTAButton>
    </section>
  );
}
