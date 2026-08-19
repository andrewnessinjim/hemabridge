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
