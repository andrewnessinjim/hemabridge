export interface HowItWorksStep {
  image: string;
  alt: string;
  heading: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    image: "/how-it-works/step-1-flow.png",
    alt: "Red and white blood cells flowing through an intact vessel, with small hexagonal Hemabridge nanoparticles circulating among them.",
    heading: "Flowing normally",
    description:
      "Red and white blood cells move freely through an intact vessel. Hemabridge nanoparticles circulate right alongside them, inactive, simply on patrol.",
  },
  {
    image: "/how-it-works/step-2-breach.png",
    alt: "A small gap opening in the vessel's inner lining.",
    heading: "Injury opens the wall",
    description:
      "When the vessel wall is breached, a gap opens in the inner lining. This is the earliest signal Hemabridges are engineered to detect.",
  },
  {
    image: "/how-it-works/step-3-converge.png",
    alt: "A Hemabridge nanoparticle anchored directly at the site of the breach.",
    heading: "Hemabridges anchor first",
    description:
      "Circulating Hemabridge nanoparticles are drawn to the breach and anchor to it directly, arriving ahead of the body's own clotting cells.",
  },
  {
    image: "/how-it-works/step-4-stabilized.png",
    alt: "Platelets and fibrin strands gathered around the anchored nanoparticles at the breach, sealing it.",
    heading: "Platelets and fibrin reinforce",
    description:
      "Platelets and fibrin strands gather around the anchored nanoparticles, reinforcing the body's own clotting response until the wound stabilizes.",
  },
];
