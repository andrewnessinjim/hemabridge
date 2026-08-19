"use client";

import * as React from "react";
import styles from "./DesktopMenu.module.scss";
import NavItem from "./NavItem";
import CTAButton from "../CTAButton";

function DesktopMenu() {
  return (
    <ul className={styles.wrapper}>
      <NavItem href="#">About</NavItem>
      <NavItem href="#">Our Books</NavItem>
      <NavItem href="#">Statistics</NavItem>
      {/* <NavItem href="#">Partners</NavItem> */}
      <li>
        <CTAButton size="small">Partner With Us</CTAButton>
      </li>
    </ul>
  );
}

export default DesktopMenu;
