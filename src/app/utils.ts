export const convertDegreesToRadians = (angle: number) =>
  (angle * Math.PI) / 180;

export const normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1,
) => {
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const clamp = (val, min = 0, max = 1) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.max(min, Math.min(max, val));
};

export const clampedNormalize = (
  value: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1,
) => {
  return clamp(
    normalize(
      value,
      currentScaleMin,
      currentScaleMax,
      newScaleMin,
      newScaleMax,
    ),
    newScaleMin,
    newScaleMax,
  );
};

export const convertPolarToCartesian = ([angle, distance]: [
  number,
  number,
]) => {
  const x = distance * Math.cos(angle);
  const y = distance * Math.sin(angle);

  return [x, y];
};
