import { BookData } from "@/data";
import styles from "./Book.module.css";
import Image from "next/image";

type Props = {
  book: BookData;
};

export default function Book({ book }: Props) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.imageButton}>
        <Image
          src={book.coverImage}
          alt={book.coverImageAlt}
          fill
          className={styles.cover}
        />
        <span className={styles.moreInfo}>Click for more info</span>
      </button>
    </div>
  );
}
