"use client";

import Flow from "./Flow";
import drawFibrin, { createFibrinState, activateFibrin } from "./drawFibrin";

const NUM_FIBRIN = 15;
const FIBRIN_RADIUS = 16;
const FIBRIN_DRIFT = 0.001;

export default function FibrinFlow() {
  return (
    <Flow
      count={NUM_FIBRIN}
      radius={FIBRIN_RADIUS}
      drift={FIBRIN_DRIFT}
      drawParticle={drawFibrin}
      createParticleState={createFibrinState}
      order={2}
      clottable
      onCapture={activateFibrin}
    />
  );
}
