import * as React from "react";
import styles from "./Header.module.css";
import Logo from "../Logo";

function Header() {
  return (
    <div className={`${styles.wrapper} siteWideContainer`}>
      <Logo />
    </div>
  );
}

export default Header;
