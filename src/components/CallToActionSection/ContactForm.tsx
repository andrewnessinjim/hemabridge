"use client";

import * as React from "react";
import { Select } from "radix-ui";
import styles from "./ContactForm.module.scss";
import CTAButton from "../CTAButton";
import { PARTNER_TYPES } from "./partnerTypes";

export default function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={styles.confirmation}>
        Thanks for reaching out — we&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="partner-as">
          Partner As
        </label>
        <Select.Root name="partnerAs" required>
          <Select.Trigger className={styles.selectTrigger} id="partner-as">
            <Select.Value placeholder="Choose one" />
            <Select.Icon className={styles.selectIcon}>▾</Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className={styles.selectContent}
              position="popper"
              sideOffset={4}
            >
              <Select.Viewport className={styles.selectViewport}>
                {PARTNER_TYPES.map((type) => (
                  <Select.Item
                    key={type.value}
                    value={type.value}
                    className={styles.selectItem}
                  >
                    <Select.ItemText>{type.label}</Select.ItemText>
                    <Select.ItemIndicator className={styles.selectItemIndicator}>
                      ✓
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          required
          placeholder="you@example.com"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about what you have in mind"
        />
      </div>

      <CTAButton type="submit">Send Message</CTAButton>
    </form>
  );
}
