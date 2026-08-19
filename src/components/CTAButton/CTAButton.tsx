"use client";

import * as React from "react";
import styles from "./CTAButton.module.scss";
import { motion, Variants } from "motion/react";

type Props = React.ComponentProps<"button"> & {
  size?: "small" | "medium";
};

const GRAPHIC_OFFSET: Record<"small" | "medium", number> = {
  small: 5,
  medium: 10,
};

function graphicVariants(position: "top" | "bottom", offset: number): Variants {
  return {
    hover: { opacity: 1, y: 0, scaleY: 1 },
    rest: { opacity: 0, y: position === "bottom" ? offset : -offset, scaleY: 1 },
  };
}
function CTAButton({ size = "medium", ...props }: Props) {
  const graphicSize = size === "small" ? styles.graphicSmall : styles.graphicMedium;
  const graphicOffset = GRAPHIC_OFFSET[size];

  return (
    <motion.div
      className={styles.wrapper}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <motion.div
        className={`${styles.graphic} ${styles.graphicTop} ${graphicSize}`}
        variants={graphicVariants("top", graphicOffset)}
      ></motion.div>
      <button className={`${styles.button} ${styles[size]}`} {...props}></button>
      <motion.div
        className={`${styles.graphic} ${styles.graphicBottom} ${graphicSize}`}
        variants={graphicVariants("bottom", graphicOffset)}
      ></motion.div>
    </motion.div>
  );
}

export default CTAButton;
