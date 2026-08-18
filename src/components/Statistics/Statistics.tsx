"use client";

import * as React from "react";
import CountStatistic from "./CountStatistic";
import SectionIntro from "@/components/SectionIntro";
import styles from "./Statistics.module.css";

interface Statistic {
  count: number;
  label: string;
  description: string;
}

const statistics: Statistic[] = [
  {
    count: 24,
    label: "Research Publications",
    description:
      "Advancing knowledge in hemostasis and biomaterials. \
      Turning research into shared knowledge.",
  },
  {
    count: 14,
    label: "Partner Institutions",
    description:
      "Connecting researchers across disciplines. \
      Building a stronger scientific community.",
  },
  {
    count: 37,
    label: "Educational Resources",
    description:
      "Making complex biology easier to explore. \
      Helping the next generation learn.",
  },
  {
    count: 6,
    label: "Core Research Areas",
    description:
      "Exploring biology from multiple perspectives. \
      Connecting disciplines through innovation.",
  },
];

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
