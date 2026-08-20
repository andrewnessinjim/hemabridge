"use client";

import { BookData } from "@/data";
import styles from "./Book.module.scss";
import Image from "next/image";
import StyledDialog from "../StyledDialog";
import { motion, Variants } from "motion/react";

type Props = {
  book: BookData;
};

const imageVariants: Variants = {
  hover: { scale: 1.05 },
  rest: { scale: 1 },
};

const imageWrapperVariants: Variants = {
  show: {
    opacity: 1,
    x: 0,
    transition: {
      x: { type: "spring", stiffness: 50, damping: 10 },
      opacity: { type: "tween", duration: 1 },
    },
  },
  hide: { opacity: 0, x: 10 },
};

const MotionImage = motion.create(Image);
export default function Book({ book }: Props) {
  return (
    <div className={styles.wrapper}>
      <StyledDialog
        title={book.title}
        description={book.description}
        trigger={
          <button className={styles.imageButton}>
            <motion.div
              className={styles.imageWrapper}
              variants={imageWrapperVariants}
            >
              <MotionImage
                src={book.coverImage}
                alt={book.coverImageAlt}
                fill
                whileHover="hover"
                className={styles.cover}
                variants={imageVariants}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              />
              <span className={styles.moreInfo}>Click for more info</span>
            </motion.div>
          </button>
        }
      >
        <div className={styles.details}>
          <div className={styles.detailsCover}>
            <Image
              src={book.coverImage}
              alt={book.coverImageAlt}
              fill
              className={styles.cover}
            />
          </div>
          <div className={styles.detailsBody}>
            <p className={styles.detailsTitle}>{book.title}</p>
            <p className={styles.detailsSubtitle}>{book.subtitle}</p>
            <p className={styles.detailsAuthors}>{book.authors.join(", ")}</p>
            <p className={styles.detailsDescription}>{book.description}</p>
            <dl className={styles.detailsMeta}>
              <dt>Publisher</dt>
              <dd>{book.publisher}</dd>
              <dt>Edition</dt>
              <dd>{book.edition}</dd>
              <dt>Pages</dt>
              <dd>{book.pages}</dd>
              <dt>Released</dt>
              <dd>{book.releaseDate}</dd>
              <dt>Category</dt>
              <dd>{book.category}</dd>
              <dt>Level</dt>
              <dd>{book.level}</dd>
              <dt>Language</dt>
              <dd>{book.language}</dd>
              <dt>ISBN</dt>
              <dd>{book.isbn}</dd>
            </dl>
          </div>
        </div>
      </StyledDialog>
    </div>
  );
}
