export type PartnerType = {
  value: string;
  label: string;
  statements: string[];
};

export const PARTNER_TYPES: PartnerType[] = [
  {
    value: "student",
    label: "Student",
    statements: [
      "Contribute to real biomaterials research through internships and thesis projects.",
      "Get hands-on experience with nanoparticle synthesis and lab equipment.",
      "Work alongside our research team and co-author peer-reviewed publications.",
      "Build a foundation for a career in translational medicine.",
    ],
  },
  {
    value: "investor",
    label: "Investor",
    statements: [
      "Fund the next stage of clinical validation and regulatory approval.",
      "Gain early access to a defensible position in the hemostasis biomaterials market.",
      "Back a team with a clear path from bench to bedside.",
      "Help scale manufacturing for broader clinical deployment.",
    ],
  },
  {
    value: "company",
    label: "Company",
    statements: [
      "License Hemabridges technology for integration into existing wound-care products.",
      "Co-develop application-specific formulations for your patient population.",
      "Access joint R&D resources and shared IP frameworks.",
      "Fast-track go-to-market through an established research partnership.",
    ],
  },
];
