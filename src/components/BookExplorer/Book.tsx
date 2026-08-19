"use client";

import { BookData } from "@/data";
import styles from "./Book.module.css";
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

const MotionImage = motion.create(Image);
export default function Book({ book }: Props) {
  return (
    <div className={styles.wrapper}>
      <StyledDialog
        title="Hello"
        description="World"
        trigger={
          <button className={styles.imageButton}>
            <motion.div
              className={styles.imageWrapper}
              whileHover="hover"
              animate="rest"
            >
              <MotionImage
                src={book.coverImage}
                alt={book.coverImageAlt}
                fill
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
        <motion.div className={styles.imageWrapper}>
          <Image src={book.coverImage} alt={book.coverImageAlt} fill />
        </motion.div>
      </StyledDialog>
    </div>
  );
}
