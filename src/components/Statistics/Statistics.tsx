"use client";

import * as React from "react";
import CountStatistic from "./CountStatistic";
import SectionIntro from "@/components/SectionIntro";
import styles from "./Statistics.module.scss";
import { statistics } from "@/data";

function CountStatistics() {
  return (
    <div className={`siteNarrowContainer ${styles.wrapper}`}>
      <SectionIntro
        headingId="statistics-heading"
        heading="Statistics"
        subheading="From ideas to impact."
        description="Biology provides the foundation. Engineering provides new possibilities. At Hemabridges, we bring the two together to explore what becomes possible when technology works alongside the body's natural mechanisms"
      />
      <div className={styles.countStatisticsWrapper}>
        {statistics.map((statistic) => (
          <CountStatistic key={statistic.label} {...statistic} />
        ))}
      </div>
    </div>
  );
}

export default CountStatistics;
