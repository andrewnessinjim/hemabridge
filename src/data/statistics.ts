export interface Statistic {
  count: number;
  label: string;
  description: string;
}

export const statistics: Statistic[] = [
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
