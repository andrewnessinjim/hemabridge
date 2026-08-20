"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import styles from "./HowItWorksSteps.module.scss";
import { howItWorksSteps } from "@/data";

const MotionImage = motion.create(Image);

function HowItWorksSteps() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ol className={styles.wrapper}>
      {howItWorksSteps.map((step, index) => (
        <li className={styles.step} key={step.heading}>
          <div className={styles.imageWrapper}>
            <MotionImage
              src={step.image}
              alt={step.alt}
              fill
              className={styles.image}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.4 }}
            />
          </div>
          <div className={styles.text}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <div>
              <h3 className={styles.heading}>{step.heading}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default HowItWorksSteps;
