import { pipe, of, empty } from "rxjs";
import { flatMap, map } from "rxjs/operators";

export function incrementalBuffer({ maxItems, minItems, incrementCountBy }) {
  let buffer = [];
  let emitCountdown = minItems || incrementCountBy;

  return pipe(
    flatMap((item) => {
      buffer.push(item);
      emitCountdown--;

      if (emitCountdown === 0) {
        emitCountdown = incrementCountBy;
        buffer = buffer.slice(-maxItems);
        return of(buffer);
      }

      return empty();
    })
  );
}

export function averageScoreBuffer(maxItems = 30, minItems = 4) {
  return pipe(
    map((metric) => metric.probability),
    incrementalBuffer({
      maxItems,
      minItems,
      incrementCountBy: 1,
    }),
    map((probabilities) => {
      return (
        probabilities.reduce((acc, probability) => acc + probability) /
        probabilities.length
      );
    }),
    map((average) => Number(average.toFixed(3)))
  );
}

export function mapRange({ value, fromRange, toRange, reverse = false }) {
  const [fromMin, fromMax] = fromRange;
  const target = clamp(value, fromMin, fromMax);
  const number = reverse ? reverseRange(target, fromRange) : target;
  const [toMin, toMax] = toRange;
  return ((number - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
}

export function reverseRange(value, [min, max]) {
  return max + min - value;
}

export function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}
