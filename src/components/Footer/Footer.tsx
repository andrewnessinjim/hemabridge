import Logo from "../Logo";
import styles from "./Footer.module.scss";

const LINK_COLUMNS = [
  {
    heading: "Company",
    links: ["About", "Our Books", "Statistics", "Partner With Us"],
  },
  {
    heading: "Resources",
    links: ["Research Publications", "Case Studies", "FAQ", "Blog"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

const SOCIAL_LINKS = ["LinkedIn", "Twitter / X", "ResearchGate"];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.wrapper}>
      <div className={`siteWideContainer ${styles.inner}`}>
        <div className={styles.topRow}>
          <div className={styles.brandColumn}>
            <Logo />
            <p className={styles.tagline}>
              Engineered nanoparticles for the next generation of hemostasis.
            </p>
          </div>

          <div className={styles.linkColumns}>
            {LINK_COLUMNS.map((column) => (
              <div key={column.heading} className={styles.linkColumn}>
                <h3 className={styles.linkHeading}>{column.heading}</h3>
                <ul className={styles.linkList}>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className={styles.link}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {year} Hemabridges. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            {SOCIAL_LINKS.map((social) => (
              <a key={social} href="#" className={styles.link}>
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
