import * as React from "react";
import { Dialog, VisuallyHidden } from "radix-ui";
import styles from "./StyledDialog.module.scss";
import { motion, Variants } from "motion/react";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
};

const MotionDialogContent = motion.create(Dialog.Content);
function StyledDialog({ children, trigger, title, description }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Close asChild>
            <button className={styles.closeButton} aria-label="Close">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </Dialog.Close>
          <motion.div
            className={styles.AnimatedDialogGraphic}
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
          ></motion.div>
          <motion.div
            className={styles.AnimatedDialogContent}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
          >
            <Dialog.Title>
              <VisuallyHidden.Root>{title}</VisuallyHidden.Root>
            </Dialog.Title>
            <Dialog.Description>
              <VisuallyHidden.Root>{description}</VisuallyHidden.Root>
            </Dialog.Description>
            {children}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default StyledDialog;
