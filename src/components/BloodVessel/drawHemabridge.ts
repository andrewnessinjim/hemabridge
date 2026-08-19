import { convertPolarToCartesian } from "@/app/utils";
import _ from "lodash";

const MIN_HEMABRIDGE_RADIUS = 10;
export const MAX_HEMABRIDGE_RADIUS = 14;

const ROTATION_SPEED = 0.005; // radians of spin per pixel of forward movement

const BRIDGE_POINT_RADIUS = 2;
const NUCLEUS_RADIUS_FRACTION = 0.22;
const BRIDGE_ARM_LENGTH = 14;
const BRIDGE_PULSE_DURATION = 2; // seconds
const BRIDGE_GROW_DURATION = 5; // seconds
const BRIDGE_PULSE_SPEED = 6; // radians/sec
const BRIDGE_PULSE_AMOUNT = 0.4;

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

export const HEMABRIDGE_COLORS = {
  body: "hsl(207 60% 65%)",
  outerMembrane: "hsl(207 60% 35%)",
  innerMembrane: "hsl(207 50% 55%)",
  bridgePoint: "hsl(207 65% 18%)",
  bridgeArm: "hsl(207 55% 32%)",
  nucleus: "hsl(207 60% 24%)",
  clotted: "hsl(207 85% 70%)",
};

export function createHemabridgeState() {
  return {
    clotted: false,
    radius: _.random(MIN_HEMABRIDGE_RADIUS, MAX_HEMABRIDGE_RADIUS, true),
    rotation: _.random(0, Math.PI * 2, true),
    capturedAt: undefined as number | undefined,
  };
}

export type HemabridgeState = ReturnType<typeof createHemabridgeState>;

export function activateHemabridge(state: HemabridgeState): HemabridgeState {
  return { ...state, clotted: true };
}

function traceHexagon(ctx: CanvasRenderingContext2D, radius: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = ((Math.PI * 2) / 6) * i - Math.PI / 2;
    const [x, y] = convertPolarToCartesian([angle, radius]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawBridgePoints(
  ctx: CanvasRenderingContext2D,
  radius: number,
  pointScale: number,
) {
  for (let i = 0; i < 6; i++) {
    const angle = ((Math.PI * 2) / 6) * i - Math.PI / 2;
    const [x, y] = convertPolarToCartesian([angle, radius]);
    ctx.beginPath();
    ctx.arc(x, y, BRIDGE_POINT_RADIUS * pointScale, 0, Math.PI * 2);
    ctx.fillStyle = HEMABRIDGE_COLORS.bridgePoint;
    ctx.fill();
  }
}

// Draws a thick arm growing outward from each corner, with another bridge
// point at the tip, as the clot pulls in nearby platelets and fibrin.
function drawBridgeArms(
  ctx: CanvasRenderingContext2D,
  radius: number,
  growProgress: number,
) {
  if (growProgress <= 0) return;

  for (let i = 0; i < 6; i++) {
    const angle = ((Math.PI * 2) / 6) * i - Math.PI / 2;
    const [startX, startY] = convertPolarToCartesian([angle, radius]);
    const [endX, endY] = convertPolarToCartesian([
      angle,
      radius + BRIDGE_ARM_LENGTH * growProgress,
    ]);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = HEMABRIDGE_COLORS.bridgeArm;
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(endX, endY, BRIDGE_POINT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = HEMABRIDGE_COLORS.bridgePoint;
    ctx.fill();
  }
}

export default function drawHemabridge(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  velocity: number,
  state: HemabridgeState,
  totalTime: number,
) {
  if (!state.clotted) {
    state.rotation += velocity * ROTATION_SPEED;
  }

  if (state.clotted && state.capturedAt === undefined) {
    state.capturedAt = totalTime;
  }
  const elapsedSinceClot = state.clotted
    ? totalTime - (state.capturedAt ?? totalTime)
    : 0;

  const pointScale =
    state.clotted && elapsedSinceClot < BRIDGE_PULSE_DURATION
      ? 1 +
        Math.sin(elapsedSinceClot * BRIDGE_PULSE_SPEED) * BRIDGE_PULSE_AMOUNT
      : 1;
  const growProgress = clamp01(
    (elapsedSinceClot - BRIDGE_PULSE_DURATION) / BRIDGE_GROW_DURATION,
  );

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(state.rotation);

  traceHexagon(ctx, state.radius);
  ctx.fillStyle = state.clotted
    ? HEMABRIDGE_COLORS.clotted
    : HEMABRIDGE_COLORS.body;
  ctx.fill();
  ctx.strokeStyle = HEMABRIDGE_COLORS.outerMembrane;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.strokeStyle = HEMABRIDGE_COLORS.innerMembrane;
  ctx.lineWidth = 1;
  for (let innerMembrane = 1; innerMembrane <= 3; innerMembrane++) {
    traceHexagon(ctx, state.radius - innerMembrane * 2);
    ctx.stroke();
  }

  traceHexagon(ctx, state.radius * NUCLEUS_RADIUS_FRACTION);
  ctx.fillStyle = HEMABRIDGE_COLORS.nucleus;
  ctx.fill();

  drawBridgeArms(ctx, state.radius, growProgress);
  drawBridgePoints(ctx, state.radius, pointScale);

  ctx.restore();
}
