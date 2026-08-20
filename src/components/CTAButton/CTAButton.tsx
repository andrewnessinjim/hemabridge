"use client";

import * as React from "react";
import styles from "./CTAButton.module.scss";
import { motion, useReducedMotion, Variants } from "motion/react";

type Props = Omit<
  React.ComponentProps<"button">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> & {
  size?: "small" | "medium";
};

const GRAPHIC_OFFSET: Record<"small" | "medium", number> = {
  small: 5,
  medium: 10,
};

function graphicVariants(
  position: "top" | "bottom",
  offset: number,
  prefersReducedMotion: boolean,
): Variants {
  const offsetWithDirection = position === "bottom" ? offset : -offset;
  return {
    hover: { opacity: 1, y: 0, scaleY: 1 },
    rest: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : offsetWithDirection,
      scaleY: 1,
    },
  };
}

const buttonVariants: Variants = {
  rest: { borderRadius: 2 },
  hover: { borderRadius: 0 },
};

function CTAButton({ size = "medium", ...props }: Props) {
  const graphicSize =
    size === "small" ? styles.graphicSmall : styles.graphicMedium;
  const graphicOffset = GRAPHIC_OFFSET[size];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.wrapper}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <motion.div
        className={`${styles.graphic} ${styles.graphicTop} ${graphicSize}`}
        variants={graphicVariants("top", graphicOffset, prefersReducedMotion)}
      ></motion.div>
      <motion.button
        className={`${styles.button} ${styles[size]}`}
        variants={buttonVariants}
        {...props}
      ></motion.button>
      <motion.div
        className={`${styles.graphic} ${styles.graphicBottom} ${graphicSize}`}
        variants={graphicVariants(
          "bottom",
          graphicOffset,
          prefersReducedMotion,
        )}
      ></motion.div>
    </motion.div>
  );
}

export default CTAButton;
