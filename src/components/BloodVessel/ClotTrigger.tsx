"use client";

import * as React from "react";
import CTAButton from "../CTAButton";
import styles from "./BloodVessel.module.scss";
import { ClotContext } from "./ClotContextProvider";

type Props = {
  onSimulate: () => void;
};

function ClotTrigger({ onSimulate }: Props) {
  const { isClotting, isComplete } = React.useContext(ClotContext);

  return (
    <div className={styles.trigger}>
      <CTAButton
        size="small"
        disabled={isClotting && !isComplete}
        onClick={onSimulate}
      >
        {isClotting && !isComplete ? "Clot forming..." : "Simulate Clot"}
      </CTAButton>
      {isComplete && (
        <span className={styles.completeLabel}>Simulation Complete</span>
      )}
    </div>
  );
}

export default ClotTrigger;
