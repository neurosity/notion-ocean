import React, { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Ocean } from "../components/Ocean/Ocean";
import { clamp, calmRange } from "../components/Ocean/weather.js";
import { averageScoreBuffer } from "../utils";

import volumeIcon from "../images/volume.png";
import noVolumeIcon from "../images/noVolume.png";

const niceOceanSounds = new Audio("../../sounds/niceOceanSounds.mp3");

const [min, max] = calmRange;

export function Calm({ user, notion }) {
  const [calm, setCalm] = useState(0);
  const [isPlayingSounds, setIsPlaying] = useState(false);

  function playSounds() {
    if (!isPlayingSounds) {
      niceOceanSounds.play();
      niceOceanSounds.currentTime = 2;
    } else {
      niceOceanSounds.pause();
      niceOceanSounds.currentTime = 2;
    }
    setIsPlaying(prevIsPlayingSounds => !prevIsPlayingSounds);
    niceOceanSounds.volume = 0.3;
  }

  function setAudioVolume(calmScore) {
    let volume = 0.0;
    if (calmScore < 0.1) {
      volume = 1.0;
    } else if (calmScore < 0.15) {
      volume = 0.7;
    } else if (calmScore < 0.2) {
      volume = 0.5;
    } else if (calmScore < 0.25) {
      volume = 0.3;
    } else {
      volume = 0.2;
    }
    niceOceanSounds.volume = volume;
  }

  useEffect(() => {
    if (!user || !notion) {
      return;
    }

    const calmAverage$ = notion.calm().pipe(averageScoreBuffer());

    const subscription = calmAverage$.subscribe(calm => {
      const calmScore = clamp(calm, min, max);
      // console.log("Calm", calmScore);
      setAudioVolume(calmScore);
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
      {isPlayingSounds ? (
        <img
          src={noVolumeIcon}
          width="30px"
          hieght="30px"
          onClick={playSounds}
          alt="Volume Button"
          className="audio-logo"
        />
      ) : (
        <img
          src={volumeIcon}
          width="30px"
          hieght="30px"
          onClick={playSounds}
          alt="Volume Button"
          className="audio-logo"
        />
      )}
      <Ocean calm={calm} />
    </main>
  );
}
