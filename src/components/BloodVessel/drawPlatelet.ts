import { random, range } from "lodash";
import { convertPolarToCartesian, normalize } from "@/app/utils";
import createNoiseGenerator from "../../vendor/noise.vendor";

const PLATELET_RADIUS = 11;
const NUM_SPIKES = 7;
const NUM_BLOB_POINTS = 30;
const BLOB_NOISE_ZOOM = 3;

function generateBlobPoints(minRadius: number, maxRadius: number) {
  const { simplex2 } = createNoiseGenerator(random(1000));

  return range(NUM_BLOB_POINTS).map((i) => {
    const angle = normalize(i, 0, NUM_BLOB_POINTS, 0, 2 * Math.PI);

    const noiseX = Math.cos(angle) * BLOB_NOISE_ZOOM;
    const noiseY = Math.sin(angle) * BLOB_NOISE_ZOOM;
    const distance = normalize(
      simplex2(noiseX, noiseY),
      -1,
      1,
      minRadius,
      maxRadius,
    );

    const [x, y] = convertPolarToCartesian([angle, distance]);
    return { x, y: y * 0.6 };
  });
}

export const PLATELET_COLORS = {
  normal: "hsl(340 45% 85%)",
  clotted: "hsl(340 65% 75%)",
};

export function createPlateletState() {
  return {
    clotted: false,
    spikeAngles: range(NUM_SPIKES).map(() => random(0, Math.PI * 2, true)),
    blobPoints: generateBlobPoints(PLATELET_RADIUS * 0.75, PLATELET_RADIUS),
  };
}

export type PlateletState = ReturnType<typeof createPlateletState>;

export function activatePlatelet(state: PlateletState): PlateletState {
  return { ...state, clotted: true };
}

export default function drawPlatelet(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  velocity: number,
  state: PlateletState,
) {
  ctx.save();
  ctx.translate(cx, cy);

  const color = state.clotted
    ? PLATELET_COLORS.clotted
    : PLATELET_COLORS.normal;

  if (state.clotted) {
    state.spikeAngles.forEach((angle) => {
      const innerR = PLATELET_RADIUS * 0.7;
      const outerR = PLATELET_RADIUS * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
      ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  const points = state.blobPoints;
  const lastPoint = points[points.length - 1];
  const startX = (lastPoint.x + points[0].x) / 2;
  const startY = (lastPoint.y + points[0].y) / 2;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  points.forEach((point, i) => {
    const next = points[(i + 1) % points.length];
    const midX = (point.x + next.x) / 2;
    const midY = (point.y + next.y) / 2;
    ctx.quadraticCurveTo(point.x, point.y, midX, midY);
  });
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}
