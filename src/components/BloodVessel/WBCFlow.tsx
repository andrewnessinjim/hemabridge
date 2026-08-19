"use client";

import Flow from "./Flow";
import drawWBC, { createWBCState } from "./drawWBC";

const NUM_WBC = 5;
const WBC_RADIUS = 24;
const WBC_DRIFT = 0.001;

export default function WBCFlow() {
  return (
    <Flow
      count={NUM_WBC}
      radius={WBC_RADIUS}
      drift={WBC_DRIFT}
      drawParticle={drawWBC}
      createParticleState={createWBCState}
      order={1}
    />
  );
}
