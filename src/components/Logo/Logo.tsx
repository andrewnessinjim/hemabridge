import * as React from "react";
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hema}>Hema</div>
      <div className={styles.bridges}>bridges</div>
    </div>
  );
}

export default Logo;
