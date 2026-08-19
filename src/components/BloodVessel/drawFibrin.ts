import { random } from "lodash";

const NORMAL_LENGTH = 18;
const CLOTTED_LENGTH = 54;

export const FIBRIN_COLORS = {
  normal: "hsl(45 40% 85%)",
  clotted: "hsl(45 60% 70%)",
};

export function createFibrinState() {
  return {
    clotted: false,
    angle: random(-0.3, 0.3, true),
    wobbleSeed: random(0, 1000),
  };
}

export type FibrinState = ReturnType<typeof createFibrinState>;

export function activateFibrin(state: FibrinState): FibrinState {
  return { ...state, clotted: true, angle: random(0, Math.PI * 2, true) };
}

export default function drawFibrin(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  velocity: number,
  state: FibrinState,
) {
  const length = state.clotted ? CLOTTED_LENGTH : NORMAL_LENGTH;
  const segments = state.clotted ? 10 : 5;
  const waveAmplitude = state.clotted ? 4.5 : 1.5;
  const waveFrequency = state.clotted ? 3 : 1.5;
  const color = state.clotted ? FIBRIN_COLORS.clotted : FIBRIN_COLORS.normal;

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = -length / 2 + length * t;
    const y =
      Math.sin(t * Math.PI * waveFrequency + state.wobbleSeed) *
      waveAmplitude;
    points.push({ x, y });
  }

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(state.angle);

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
  }
  const secondLast = points[points.length - 2];
  const last = points[points.length - 1];
  ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);

  ctx.strokeStyle = color;
  ctx.lineWidth = state.clotted ? 4.5 : 2.5;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.restore();
}
