import React, { useState, useEffect } from "react";
import volumeIcon from "../images/volume.png";
import noVolumeIcon from "../images/noVolume.png";

const niceOceanSounds = new Audio("../../sounds/niceOceanSounds.mp3");

export function Sound({ calm }) {
  const [isPlayingSounds, setIsPlaying] = useState(false);

  useEffect(() => {
    setAudioVolume(calm);
  }, [calm]);

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
