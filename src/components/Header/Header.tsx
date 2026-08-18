import * as React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo";
import Navigation from "../Navigation";

function Header() {
  return (
    <div className={`${styles.wrapper} siteWideContainer`}>
      <Logo />
      <Navigation />
    </div>
  );
}

export default Header;
