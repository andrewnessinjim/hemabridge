"use client";

import * as React from "react";
import styles from "./BookExplorer.module.scss";
import { booksData } from "@/data";
import Book from "./Book";
import { motion, stagger, Variants } from "motion/react";

const variants: Variants = {
  show: {
    transition: { delayChildren: stagger(0.12, { startDelay: 0.25}) },
  },
};
function BookExplorer() {
  return (
    <motion.div
      className={styles.wrapper}
      initial="hide"
      whileInView="show"
      viewport={{ margin: "-30px", once: true }}
      variants={variants}
    >
      {booksData.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </motion.div>
  );
}

export default BookExplorer;
