import Image from "next/image";
import styles from "./HowItWorksSteps.module.scss";
import { howItWorksSteps } from "@/data";

function HowItWorksSteps() {
  return (
    <ol className={styles.wrapper}>
      {howItWorksSteps.map((step, index) => (
        <li className={styles.step} key={step.heading}>
          <div className={styles.imageWrapper}>
            <Image src={step.image} alt={step.alt} fill className={styles.image} />
          </div>
          <div className={styles.text}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <div>
              <h3 className={styles.heading}>{step.heading}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default HowItWorksSteps;
