import _ from "lodash";

const MIN_RIM_RADIUS = 14;
const MAX_RIM_RADIUS = 18;
const MIN_DEPRESSION_RADIUS = 8;
const MAX_DEPRESSION_RADIUS = 12;

export const RBC_COLORS = {
  rimInner: "hsl(353 70% 20%)",
  rimMid: "hsl(353 89.8% 24%)",
  rimOuter: "hsl(353 89.8% 20%)",
  depressionCenter: "hsl(353 70% 35%)",
  depressionEdge: "hsl(353 89.8% 24%)",
};

export function createRBCState() {
  return {
    rimRadius: _.random(MIN_RIM_RADIUS, MAX_RIM_RADIUS, true),
    depressionRadius: _.random(
      MIN_DEPRESSION_RADIUS,
      MAX_DEPRESSION_RADIUS,
      true,
    ),
  };
}

type RBCParticleState = ReturnType<typeof createRBCState>;

export default function drawRBC(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  _: number,
  state: RBCParticleState,
) {
  ctx.beginPath();
  ctx.arc(cx, cy, state.rimRadius, 0, Math.PI * 2);
  const outerGradient = ctx.createRadialGradient(
    cx,
    cy,
    state.depressionRadius,
    cx,
    cy,
    state.rimRadius,
  );
  outerGradient.addColorStop(0, RBC_COLORS.rimInner);
  outerGradient.addColorStop(0.5, RBC_COLORS.rimMid);
  outerGradient.addColorStop(1, RBC_COLORS.rimOuter);
  ctx.fillStyle = outerGradient;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  const gradient = ctx.createRadialGradient(
    cx,
    cy,
    6,
    cx,
    cy,
    state.depressionRadius,
  );
  gradient.addColorStop(0, RBC_COLORS.depressionCenter);
  gradient.addColorStop(0.99, RBC_COLORS.depressionEdge);
  gradient.addColorStop(1, RBC_COLORS.depressionEdge);
  ctx.fillStyle = gradient;
  ctx.fill();
}
