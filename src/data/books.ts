export interface BookData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  authors: string[];
  pages: number;
  edition: string;
  releaseDate: string;
  publisher: string;
  isbn: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  coverImage: string;
  coverImageAlt: string;
}

export const booksData: BookData[] = [
  {
    id: "the-hemostasis-handbook",
    title: "The Hemostasis Handbook",
    subtitle: "Principles of Coagulation, Platelets, and Vascular Repair",
    description:
      "An accessible introduction to the biological mechanisms that stop bleeding and restore vascular integrity, covering platelet activation, coagulation, fibrin formation, and vessel-wall interactions.",
    authors: ["Dr. Elena Voss", "Dr. Marcus Chen"],
    pages: 284,
    edition: "2nd Edition",
    releaseDate: "2019-09-14",
    publisher: "Hemabridges Research Press",
    isbn: "978-1-946821-01-7",
    category: "Hemostasis",
    level: "Intermediate",
    language: "English",
    coverImage: "/books/the-hemostasis-handbook.png",
    coverImageAlt:
      'Book cover for "The Hemostasis Handbook" by Dr. Elena Voss and Dr. Marcus Chen',
  },
  {
    id: "engineered-nanoparticles",
    title: "Engineered Nanoparticles in Biomedicine",
    subtitle: "Designing Small Systems for Biological Environments",
    description:
      "An exploration of how engineered nanoparticles can be designed to interact with cells, proteins, and biological interfaces while supporting targeted biomedical applications.",
    authors: ["Dr. Adrian Cole", "Dr. Priya Nair"],
    pages: 318,
    edition: "1st Edition",
    releaseDate: "2021-04-22",
    publisher: "Hemabridges Research Press",
    isbn: "978-1-946821-02-4",
    category: "Nanobiotechnology",
    level: "Advanced",
    language: "English",
    coverImage: "/books/engineered-nanoparticles.png",
    coverImageAlt:
      'Book cover for "Engineered Nanoparticles in Biomedicine" by Dr. Adrian Cole and Dr. Priya Nair',
  },
  {
    id: "platelets-beyond-clots",
    title: "Platelets Beyond Clots",
    subtitle: "Understanding the Many Roles of the Smallest Blood Cells",
    description:
      "A closer look at platelets beyond their traditional role in clot formation, examining their interactions with vascular tissue, immune cells, biomaterials, and engineered therapeutic systems.",
    authors: ["Dr. Sofia Bennett", "Dr. Daniel Okafor"],
    pages: 246,
    edition: "1st Edition",
    releaseDate: "2022-06-17",
    publisher: "Hemabridges Research Press",
    isbn: "978-1-946821-03-1",
    category: "Platelet Biology",
    level: "Intermediate",
    language: "English",
    coverImage: "/books/platelets-beyond-clots.png",
    coverImageAlt:
      'Book cover for "Platelets Beyond Clots" by Dr. Sofia Bennett and Dr. Daniel Okafor',
  },
  {
    id: "biomaterials-that-interact-with-life",
    title: "Biomaterials That Interact with Life",
    subtitle: "Engineering Materials for Living Systems",
    description:
      "An introduction to the principles behind biomaterials that interact with biological systems, from surface chemistry and cellular responses to the design of next-generation biomedical interfaces.",
    authors: ["Dr. Maya Laurent", "Dr. Thomas Reed"],
    pages: 292,
    edition: "1st Edition",
    releaseDate: "2023-02-11",
    publisher: "Hemabridges Research Press",
    isbn: "978-1-946821-04-8",
    category: "Biomaterials",
    level: "Advanced",
    language: "English",
    coverImage: "/books/biomaterials-that-interact-with-life.png",
    coverImageAlt:
      'Book cover for "Biomaterials That Interact with Life" by Dr. Maya Laurent and Dr. Thomas Reed',
  },
  {
    id: "vascular-biology-essentials",
    title: "Vascular Biology Essentials",
    subtitle: "From Vessel Architecture to Cellular Signaling",
    description:
      "A visual and practical guide to vascular biology, exploring the structure of blood vessels and the cellular processes that regulate vascular health, repair, and response to injury.",
    authors: ["Dr. Hannah Park", "Dr. Samuel Wright"],
    pages: 264,
    edition: "1st Edition",
    releaseDate: "2024-08-29",
    publisher: "Hemabridges Research Press",
    isbn: "978-1-946821-05-5",
    category: "Vascular Biology",
    level: "Beginner",
    language: "English",
    coverImage: "/books/vascular-biology-essentials.png",
    coverImageAlt:
      'Book cover for "Vascular Biology Essentials" by Dr. Hannah Park and Dr. Samuel Wright',
  },
  {
    id: "futures-in-hemostasis-therapeutics",
    title: "Futures in Hemostasis Therapeutics",
    subtitle: "Emerging Technologies for Supporting Natural Repair",
    description:
      "A forward-looking examination of emerging approaches to hemostasis, including engineered nanoparticles, biomaterials, platelet-supporting technologies, and next-generation therapeutic systems.",
    authors: ["Dr. Nathan Ellis", "Dr. Aisha Raman"],
    pages: 337,
    edition: "1st Edition",
    releaseDate: "2025-11-06",
    publisher: "Hemabridges Research Press",
    isbn: "978-1-946821-06-2",
    category: "Therapeutics",
    level: "Advanced",
    language: "English",
    coverImage: "/books/futures-in-hemostasis-therapeutics.png",
    coverImageAlt:
      'Book cover for "Futures in Hemostasis Therapeutics" by Dr. Nathan Ellis and Dr. Aisha Raman',
  },
];
