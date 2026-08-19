"use client";

import Flow from "./Flow";
import drawHemabridge, {
  createHemabridgeState,
  activateHemabridge,
} from "./drawHemabridge";

const NUM_HEMABRIDGE = 10;
const HEMABRIDGE_RADIUS = 13;
const HEMABRIDGE_DRIFT = 0.0012;

export default function HemabridgeFlow() {
  return (
    <Flow
      count={NUM_HEMABRIDGE}
      radius={HEMABRIDGE_RADIUS}
      drift={HEMABRIDGE_DRIFT}
      drawParticle={drawHemabridge}
      createParticleState={createHemabridgeState}
      order={2}
      clottable
      onCapture={activateHemabridge}
    />
  );
}
