"use client";

import * as React from "react";
import BloodVessel from "../BloodVessel";
import styles from "./HowItWorksSection.module.scss";

function RevealAnimationDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <details
      className={styles.reveal}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className={styles.revealSummary}>
        Reveal animation demo
      </summary>
      <p className={styles.revealNote}>
        Incomplete and non-performant implementation, but I spent the
        maximum time building this.
      </p>
      {open && <BloodVessel />}
    </details>
  );
}

export default RevealAnimationDemo;
