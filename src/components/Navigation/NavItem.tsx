"use client";

import Link from "next/link";
import * as React from "react";
import { motion, Transition, Variants } from "motion/react";
import styles from "./NavItem.module.css";

type Props = Omit<
  React.ComponentProps<typeof Link>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
>;

const MotionLink = motion.create(Link);

const enterTransition: Transition = {
  type: "spring",
  // duration: 5
  stiffness: 120,
  damping: 10,
};

const exitTransition: Transition = {
  type: "spring",
  duration: 1.5
};

const textVariants: Variants = {
  rest: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: exitTransition,
  },
  hover: {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    transition: enterTransition,
  },
};

const coverVariants = {
  rest: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    transition: exitTransition,
  },
  hover: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: enterTransition,
  },
};

const underlineVariants = {
  rest: { opacity: 0, y: 2, transition: exitTransition },
  hover: { opacity: 1, y: -2, transition: enterTransition },
};

export default function NavItem({ children, ...delegated }: Props) {
  return (
    <motion.li
      className={styles.wrapper}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
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
      <motion.div
        className={styles.underline}
        variants={underlineVariants}
      ></motion.div>
    </motion.li>
  );
}
