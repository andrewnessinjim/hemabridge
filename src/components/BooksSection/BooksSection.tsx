import * as React from "react";
import SectionIntro from "../SectionIntro";
import styles from "./BooksSection.module.css";
import BookExplorer from "../BookExplorer";
import Spacer from "../Spacer";

function Books() {
  return (
    <div className={`siteWideContainer ${styles.wrapper}`}>
      <SectionIntro
        headingId="books-heading"
        heading="Our Books"
        subheading="Knowledge worth passing on."
        description="We publish books to make complex ideas in hemostasis, biotechnology, and biomedical engineering easier to understand and explore. By sharing our research and knowledge, we hope to give students, educators, and researchers a foundation they can build upon."
      />
      <Spacer size={12}/>
      <BookExplorer />
    </div>
  );
}

export default Books;
