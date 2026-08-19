const NUM_RBC = 50;
const RIM_RADIUS = 18;
const DEPRESSION_RADIUS = 12;
const Y_VARIATION = 0.0005;

export const RBC_COLORS = {
  rimInner: "hsl(353 70% 20%)",
  rimMid: "hsl(353 89.8% 24%)",
  rimOuter: "hsl(353 89.8% 20%)",
  depressionCenter: "hsl(353 70% 35%)",
  depressionEdge: "hsl(353 89.8% 24%)",
};

export default function drawRBC(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
) {
  ctx.beginPath();
  ctx.arc(cx, cy, RIM_RADIUS, 0, Math.PI * 2);
  const outerGradient = ctx.createRadialGradient(
    cx,
    cy,
    DEPRESSION_RADIUS,
    cx,
    cy,
    RIM_RADIUS,
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
    DEPRESSION_RADIUS,
  );
  gradient.addColorStop(0, RBC_COLORS.depressionCenter);
  gradient.addColorStop(0.99, RBC_COLORS.depressionEdge);
  gradient.addColorStop(1, RBC_COLORS.depressionEdge);
  ctx.fillStyle = gradient;
  ctx.fill();
}
