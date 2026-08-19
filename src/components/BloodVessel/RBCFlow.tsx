"use client";

import Flow from "./Flow";
import drawRBC, { createRBCState } from "./drawRBC";

const NUM_RBC = 50;
const RBC_RADIUS = 18;
const RBC_DRIFT = 0.0008;

export default function RBCFlow() {
  return (
    <Flow
      count={NUM_RBC}
      radius={RBC_RADIUS}
      drift={RBC_DRIFT}
      drawParticle={drawRBC}
      createParticleState={createRBCState}
    />
  );
}
