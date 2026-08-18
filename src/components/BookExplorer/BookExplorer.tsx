import * as React from "react";
import styles from "./BookExplorer.module.css";
import { booksData } from "@/data";
import Book from "./Book";

function BookExplorer() {
  return (
    <div className={styles.wrapper}>
      {booksData.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookExplorer;
