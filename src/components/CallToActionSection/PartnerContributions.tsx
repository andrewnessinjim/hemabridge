import styles from "./PartnerContributions.module.scss";
import { PARTNER_TYPES } from "./partnerTypes";

export default function PartnerContributions() {
  return (
    <div className={styles.grid}>
      {PARTNER_TYPES.map((type) => (
        <div key={type.value} className={styles.column}>
          <h3 className={styles.columnHeading}>{type.label}</h3>
          <ul className={styles.list}>
            {type.statements.map((statement) => (
              <li key={statement} className={styles.listItem}>
                {statement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
