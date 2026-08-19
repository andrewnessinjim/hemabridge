import { random, range } from "lodash";
import {
  convertPolarToCartesian,
  normalize,
} from "@/app/utils";
import createNoiseGenerator from "../../vendor/noise.vendor";
import { WBC_COLORS } from "@/colors";

const NUM_WBC_POINTS = 200;
const WMC_NOISE_ZOOM = 4;

const NUM_NUCLEUS_POINTS = 20;
const NUCLEUS_NOISE_ZOOM = 2;

const ROTATION_SPEED = 0.005; // radians of spin per pixel of forward movement

function generateBlobPoints(
  numPoints: number,
  minDistance: number,
  maxDistance: number,
  noiseZoom: number,
) {
  const { simplex2 } = createNoiseGenerator(random(1000));
  const blobPoints = range(numPoints).map((i) => {
    const angleRadians = normalize(i, 0, numPoints, 0, 2 * Math.PI);

    // Gives a circular dimension for the noise instead of a linear one
    const noiseX = Math.cos(angleRadians) * noiseZoom;
    const noiseY = Math.sin(angleRadians) * noiseZoom;

    const distance = normalize(
      simplex2(noiseX, noiseY),
      -1,
      1,
      minDistance,
      maxDistance,
    );

    const [x, y] = convertPolarToCartesian([angleRadians, distance]);
    return { x, y };
  });

  return blobPoints;
}

export function createWBCState() {
  const minWBCDistance = random(16, 20);
  const maxWBCDistance = minWBCDistance + 4;
  const minNucleusDistance = random(4, 6);
  const maxNucleusDistance = minNucleusDistance + 2;
  return {
    points: generateBlobPoints(
      NUM_WBC_POINTS,
      minWBCDistance,
      maxWBCDistance,
      WMC_NOISE_ZOOM,
    ),
    nucleusPoints: generateBlobPoints(
      NUM_NUCLEUS_POINTS,
      minNucleusDistance,
      maxNucleusDistance,
      NUCLEUS_NOISE_ZOOM,
    ),
    nucleusAngle: random(0, 2 * Math.PI),
    nucleusDistance: random(4, 10),
    rotation: random(0, 2 * Math.PI),
  };
}

export type WBCParticleState = ReturnType<typeof createWBCState>;

export default function drawWBC(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  velocity: number,
  state: WBCParticleState,
) {
  state.rotation += velocity * ROTATION_SPEED;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(state.rotation);

  ctx.beginPath();
  const [firstPoint, ...restPoints] = state.points;
  ctx.moveTo(firstPoint.x, firstPoint.y);

  restPoints.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });

  ctx.fillStyle = WBC_COLORS.body;
  ctx.fill();

  ctx.beginPath();
  const [nucleusFirstPoint, ...restNucleusPoints] = state.nucleusPoints;
  const [nucleusX, nucleusY] = convertPolarToCartesian([
    state.nucleusAngle,
    state.nucleusDistance,
  ]);
  ctx.moveTo(
    nucleusFirstPoint.x + nucleusX,
    nucleusFirstPoint.y + nucleusY,
  );
  restNucleusPoints.forEach((point) => {
    ctx.lineTo(point.x + nucleusX, point.y + nucleusY);
  });
  ctx.fillStyle = WBC_COLORS.nucleus;
  ctx.fill();

  ctx.restore();
}
