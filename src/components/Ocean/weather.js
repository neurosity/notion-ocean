import { mapRange } from "../../utils/index";

// calm probability from 0 to 1 - the higher the more calm
export const calmRange = [0.2, 0.5]; // more sensitive
const choppinessRange = [0, 2.5];
const windRange = [5, 25];
const sizeRange = [100, 1000];

export function mapCalmToWeather(calm) {
  const choppiness = mapRange({
    value: calm,
    fromRange: calmRange,
    toRange: choppinessRange,
    reverse: true,
  });
  const wind = mapRange({
    value: calm,
    fromRange: calmRange,
    toRange: windRange,
    reverse: true,
  });
  const size = mapRange({
    value: calm,
    fromRange: calmRange,
    toRange: sizeRange,
    reverse: false,
  });
  return { choppiness, wind, size };
}
