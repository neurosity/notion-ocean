import React, { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Ocean } from "../components/Ocean/Ocean";
import { clamp, calmRange } from "../components/Ocean/weather.js";
import { averageScoreBuffer } from "../utils";

const [min, max] = calmRange;

export function Calm({ user, notion }) {
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!user || !notion) {
      return;
    }

    const calmAverage$ = notion.calm().pipe(averageScoreBuffer());

    const subscription = calmAverage$.subscribe(calm => {
      const calmScore = clamp(calm, min, max);
      console.log("Calm", calmScore);
      setCalm(calmScore);
      // setCalm(0);
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
