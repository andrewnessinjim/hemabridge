"use client";

import Link from "next/link";
import * as React from "react";
import { motion, Transition, useReducedMotion, Variants } from "motion/react";
import styles from "./NavItem.module.scss";

type Props = Omit<
  React.ComponentProps<typeof Link>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
>;

const MotionLink = motion.create(Link);

const enterTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 10,
  restDelta: 0.005,
};

const exitTransition: Transition = {
  type: "spring",
  duration: 1.5,
};

const instantTransition: Transition = { duration: 0 };

function buildVariants(prefersReducedMotion: boolean | null) {
  const enter = prefersReducedMotion ? instantTransition : enterTransition;
  const exit = prefersReducedMotion ? instantTransition : exitTransition;

  const textVariants: Variants = {
    rest: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: exit,
    },
    hover: {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      transition: enter,
    },
  };

  const coverVariants: Variants = {
    rest: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      transition: exit,
    },
    hover: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: enter,
    },
  };

  const underlineVariants: Variants = {
    rest: { opacity: 0, y: 2, transition: exit },
    hover: { opacity: 1, y: -2, transition: enter },
  };

  return { textVariants, coverVariants, underlineVariants };
}

export default function NavItem({ children, ...delegated }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const { textVariants, coverVariants, underlineVariants } =
    buildVariants(prefersReducedMotion);

  return (
    <motion.li
      className={styles.wrapper}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <div className={styles.textWrapper}>
        <MotionLink
          {...delegated}
          className={styles.text}
          variants={textVariants}
        >
          {children}
        </MotionLink>
        <motion.span
          className={styles.cover}
          variants={coverVariants}
          aria-hidden
        >
          {children}
        </motion.span>
        <motion.div className={styles.underline} variants={underlineVariants} />
      </div>
    </motion.li>
  );
}
