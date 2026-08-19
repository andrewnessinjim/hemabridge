import * as React from "react";
import styles from "./Header.module.scss";
import Logo from "../Logo";
import DesktopMenu from "../DesktopMenu";
import MobileMenu from "../MobileMenu";

function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.inner} siteWideContainer`}>
        <Logo />

        <DesktopMenu />
        <MobileMenu />
      </div>
    </div>
  );
}

export default Header;
