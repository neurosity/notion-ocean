import React, { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Ocean } from "../components/Ocean/Ocean";
import { clamp, calmRange } from "../components/Ocean/weather.js";

const [min, max] = calmRange;

export function Calm({ user, notion }) {
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!user || !notion) {
      return;
    }

    const subscription = notion.calm().subscribe(calm => {
      const calmScore = clamp(
        Number(calm.probability.toFixed(2)),
        min,
        max
      );
      setCalm(calmScore);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, notion]);

  return (
    <main>
      {user ? <Nav notion={notion} /> : null}
      <meter value={calm} min={min} max={max} />
      <Ocean calm={calm} />
    </main>
  );
}
