// calm probability from 0 to 1 - the higher the more calm
export const calmRange = [0, 0.5]; // more sensitive
const choppinessRange = [0, 2.5];
const windRange = [5, 25];
const sizeRange = [400, 1000];

export function mapCalmToWeather(calm) {
  const choppiness = mapRange({
    value: calm,
    fromRange: calmRange,
    toRange: choppinessRange,
    reverse: true
  });
  const wind = mapRange({
    value: calm,
    fromRange: calmRange,
    toRange: windRange,
    reverse: true
  });
  const size = mapRange({
    value: calm,
    fromRange: calmRange,
    toRange: sizeRange,
    reverse: false
  });
  return { choppiness, wind, size };
}

export function mapRange({
  value,
  fromRange,
  toRange,
  reverse = false
}) {
  const [fromMin, fromMax] = fromRange;
  const target = clamp(value, fromMin, fromMax);
  const number = reverse ? reverseRange(target, fromRange) : target;
  const [toMin, toMax] = toRange;
  return (
    ((number - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
  );
}

export function reverseRange(value, [min, max]) {
  return max + min - value;
}

export function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}
