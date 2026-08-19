"use client";

import * as React from "react";
import styles from "./Navigation.module.scss";
import NavItem from "./NavItem";
import CTAButton from "../CTAButton";

function Navigation() {
  return (
    <ul className={styles.wrapper}>
      <NavItem href="#">About</NavItem>
      <NavItem href="#">Our Books</NavItem>
      <NavItem href="#">Statistics</NavItem>
      {/* <NavItem href="#">Partners</NavItem> */}
      <CTAButton size="small">Partner With Us</CTAButton>
    </ul>
  );
}

export default Navigation;
