"use client";

import React from "react";
import { MotionConfig } from "motion/react";

type Props = {
  children: React.ReactNode;
};
function RespectMotionPreferences({ children }: Props) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default RespectMotionPreferences;
