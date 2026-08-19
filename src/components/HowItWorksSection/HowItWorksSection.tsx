import * as React from "react";
import SectionIntro from "../SectionIntro";
import styles from "./HowItWorksSection.module.scss";
import Spacer from "../Spacer";
import BloodVessel from "../BloodVessel";

function HowItWorksSection() {
  return (
    <div className={`siteWideContainer ${styles.wrapper}`}>
      <SectionIntro
        headingId="how-it-works-heading"
        heading="How It Works"
        subheading="Support, right where it's needed."
        description="Hemabridges nanoparticles are engineered to recognize the earliest signs of vascular injury and work alongside platelets to reinforce the body's own clotting response. This walkthrough follows that process step by step, from first contact at the site of injury to a stabilized wound."
      />
      <Spacer size={12} />
      <BloodVessel />
    </div>
  );
}

export default HowItWorksSection;
