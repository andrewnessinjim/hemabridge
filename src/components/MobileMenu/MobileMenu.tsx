import CTAButton from "../CTAButton";
import React from "react";
import styles from "./MobileMenu.module.scss";

function MobileMenu() {
  return (
    <ul className={styles.wrapper}>
      <li>
        <CTAButton size="small">Partner With Us</CTAButton>
      </li>
    </ul>
  );
}

export default MobileMenu;
