import {
  createHemabridgeState,
  activateHemabridge,
  MAX_HEMABRIDGE_RADIUS,
  HemabridgeState,
} from "../BloodVessel/drawHemabridge";

// Seconds since capture: past the 2s pulse, partway through the 5s grow
// window, so the arms sit at roughly half length.
export const MID_GROW_ELAPSED = 4.5;
// Far past the pulse+grow window, so it's permanently in its settled,
// fully-bridged look.
export const SETTLED_ELAPSED = 1000;

function createFixedRadiusState(): HemabridgeState {
  const state = createHemabridgeState();
  state.radius = MAX_HEMABRIDGE_RADIUS;
  return state;
}

export function createRestingParticleState(): HemabridgeState {
  return createFixedRadiusState();
}

export function createMidGrowParticleState(): HemabridgeState {
  return activateHemabridge(createFixedRadiusState());
}

export function createSettledParticleState(): HemabridgeState {
  return activateHemabridge(createFixedRadiusState());
}
