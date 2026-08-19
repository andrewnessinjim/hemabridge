import PartnerCTAButton from "../PartnerCTAButton";
import React from "react";
import styles from "./MobileMenu.module.scss";

function MobileMenu() {
  return (
    <ul className={styles.wrapper}>
      <li>
        <PartnerCTAButton size="small">Partner With Us</PartnerCTAButton>
      </li>
    </ul>
  );
}

export default MobileMenu;
