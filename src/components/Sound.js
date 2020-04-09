import React, { useState, useEffect } from "react";
import volumeIcon from "../images/volume.png";
import noVolumeIcon from "../images/noVolume.png";
import { mapRange } from "../utils/index";

const niceOceanSounds = new Audio("../../sounds/niceOceanSounds.mp3");
const volumeRange = [0.0, 0.3];

export function Sound({ calm, calmRange }) {
  const [isPlayingSounds, setIsPlaying] = useState(false);

  useEffect(() => {
    const volume = mapRange({
      value: calm,
      fromRange: calmRange,
      toRange: volumeRange,
      reverse: true,
    });
    niceOceanSounds.volume = volume;
  }, [calm]);

  function playSounds() {
    if (!isPlayingSounds) {
      niceOceanSounds.play();
      niceOceanSounds.currentTime = 2;
    } else {
      niceOceanSounds.pause();
      niceOceanSounds.currentTime = 2;
    }
    setIsPlaying((prevIsPlayingSounds) => !prevIsPlayingSounds);
    niceOceanSounds.volume = 0.3;
  }

  if (isPlayingSounds) {
    return (
      <img
        src={noVolumeIcon}
        width="30px"
        hieght="30px"
        onClick={playSounds}
        alt="Volume Off Button"
        className="audio-logo"
      />
    );
  }
  return (
    <img
      src={volumeIcon}
      width="30px"
      hieght="30px"
      onClick={playSounds}
      alt="Volume On Button"
      className="audio-logo"
    />
  );
}
