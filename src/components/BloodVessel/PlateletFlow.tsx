"use client";

import Flow from "./Flow";
import drawPlatelet, {
  createPlateletState,
  activatePlatelet,
} from "./drawPlatelet";

const NUM_PLATELET = 20;
const PLATELET_RADIUS = 11;
const PLATELET_DRIFT = 0.0015;

export default function PlateletFlow() {
  return (
    <Flow
      count={NUM_PLATELET}
      radius={PLATELET_RADIUS}
      drift={PLATELET_DRIFT}
      drawParticle={drawPlatelet}
      createParticleState={createPlateletState}
      order={2}
      clottable
      onCapture={activatePlatelet}
    />
  );
}
