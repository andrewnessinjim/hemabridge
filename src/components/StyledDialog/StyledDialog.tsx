import * as React from "react";
import { Dialog, VisuallyHidden } from "radix-ui";
import styles from "./StyledDialog.module.css";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
};

function StyledDialog({ children, trigger, title, description }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title>
            <VisuallyHidden.Root>{title}</VisuallyHidden.Root>
          </Dialog.Title>
          <Dialog.Description>
            <VisuallyHidden.Root>{description}</VisuallyHidden.Root>
          </Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default StyledDialog;
