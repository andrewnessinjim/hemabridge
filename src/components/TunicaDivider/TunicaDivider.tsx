"use client";

import { motion, useReducedMotion } from "motion/react";
import Canvas from "../Canvas";
import TunicaLayers from "../BloodVessel/TunicaLayers";
import styles from "./TunicaDivider.module.scss";

type Props = {
  mode: "top" | "bottom";
};

function TunicaDivider({ mode }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 1.4 }}
    >
      <Canvas className={styles.canvas}>
        <TunicaLayers mode={mode} grayscale static />
      </Canvas>
    </motion.div>
  );
}

export default TunicaDivider;
