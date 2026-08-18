import * as React from "react";
import styles from "./CountStatistic.module.css";

import { motion, Variants } from "motion/react";

interface Props {
  count: number;
  label: string;
  description: string;
}

const descriptionVariants: Variants = {
  away: { x: "50px", opacity: 0 },
  touch: { x: "0px", opacity: 1 },
};

function CountStatistic({ count, label, description }: Props) {
  const [hasTouched, setHasTouched] = React.useState(false);
  console.log({ hasTouched });

  return (
    <div className={`${styles.wrapper} `}>
      <div className={styles.countTile}>
        <div className={styles.content}>
          <p className={styles.label}>{label}</p>
          <p className={styles.count}>{count}</p>
        </div>
        <motion.div
          className={styles.contentBorder}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: hasTouched ? [1, 0.95, 1] : 1 }}
          transition={{
            duration: 0.6,
            times: [0, 0.45, 1],
            ease: ["easeIn", "backOut"],
          }}
        ></motion.div>
      </div>
      <motion.div
        variants={descriptionVariants}
        className={`${styles.descriptionPanel}`}
        initial="away"
        animate="away"
        whileInView="touch"
        viewport={{ margin: "-20%", once: true }}
        transition={{
          type: "spring",
          duration: 0.75,
          bounce: 0,
        }}
        onAnimationComplete={(variant) => {
          console.log({ variant });
          if (variant === "touch") {
            setHasTouched(true);
          }
          if (variant === "away") {
            setHasTouched(false);
          }
        }}
      >
        <motion.div
          className={styles.descriptionBorder}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: hasTouched ? [1, 0.95, 1] : 1 }}
          transition={{
            duration: 0.4,
            times: [0, 0.25, 1],
            ease: ["easeIn", "backOut"],
          }}
        ></motion.div>
        <p>{description}</p>
      </motion.div>
    </div>
  );
}

export default CountStatistic;
