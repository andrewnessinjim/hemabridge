import * as React from "react";
import styles from "./Navigation.module.css";
import NavItem from "./NavItem";

function Navigation() {
  return (
    <ul className={styles.wrapper}>
      <NavItem href="#">About</NavItem>
      <NavItem href="#">Our Books</NavItem>
      <NavItem href="#">Statistics</NavItem>
      <NavItem href="#">Partners</NavItem>
    </ul>
  );
}

export default Navigation;
