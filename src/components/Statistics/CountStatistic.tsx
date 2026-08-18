import * as React from "react";
import styles from "./CountStatistic.module.css";
import useIsOnScreen from "@/hooks/useIsOnScreen";

import { motion } from "motion/react";

interface Props {
  count: number;
  label: string;
  description: string;
}
function CountStatistic({ count, label, description }: Props) {
  const [descPanelRef, isOnScreen] = useIsOnScreen<HTMLDivElement>({
    rootMargin: "100%",
  });

  return (
    <div className={`${styles.wrapper} `}>
      <div className={styles.countTile}>
        <p className={styles.label}>{label}</p>
        <p className={styles.count}>{count}</p>
      </div>
      <motion.div
        ref={descPanelRef}
        className={`${styles.descriptionPanel}`}
        animate={{
          x: isOnScreen ? "0px" : "100px",
          opacity: isOnScreen ? 1 : 0,
        }}
        transition={{
            type: "spring",
            stiffness: 60,
            damping: 15
        }}
      >
        {description}
      </motion.div>
    </div>
  );
}

export default CountStatistic;
