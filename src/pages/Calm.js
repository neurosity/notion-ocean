import React, { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Ocean } from "../components/Ocean/Ocean";
import { calmRange } from "../components/Ocean/weather.js";
import { averageScoreBuffer, clamp } from "../utils";
import { Sound } from "../components/Sound";

const [min, max] = calmRange;

export function Calm({ user, notion }) {
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!user || !notion) {
      return;
    }

    const subscription = notion
      .calm()
      .pipe(averageScoreBuffer(20, 4))
      .subscribe((calm) => {
        const calmScore = clamp(calm, min, max);
        setCalm(calmScore);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, notion]);

  return (
    <main>
      {user ? <Nav notion={notion} /> : null}
      {/* <meter value={calm} min={min} max={max} /> */}
      <Sound calm={calm} calmRange={calmRange}></Sound>
      <Ocean calm={calm} />
    </main>
  );
}
