"use client";

import * as React from "react";
import styles from "./DesktopMenu.module.scss";
import NavItem from "./NavItem";
import PartnerCTAButton from "../PartnerCTAButton";

function DesktopMenu() {
  return (
    <ul className={styles.wrapper}>
      <NavItem href="#">About</NavItem>
      <NavItem href="#">Our Books</NavItem>
      <NavItem href="#">Statistics</NavItem>
      {/* <NavItem href="#">Partners</NavItem> */}
      <li>
        <PartnerCTAButton size="small">Partner With Us</PartnerCTAButton>
      </li>
    </ul>
  );
}

export default DesktopMenu;
