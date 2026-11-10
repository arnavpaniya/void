"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  volume: number;
  setVolume: (vol: number) => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleAudio: () => {},
  volume: 0.15,
  setVolume: () => {},
});

export function SoundtrackProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.15); // Calm low background volume

  useEffect(() => {
    const audio = new Audio("/audio/foundation.mp3");
    audio.loop = true;
    audio.volume = 0.15;
    audio.preload = "auto";
    audioRef.current = audio;

    // Attempt gentle autoplay on user first interaction
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Browser blocked autoplay until explicit button click
          });
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      audio.pause();
      audio.src = "";
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio playback error:", err));
    }
  };

  const setVolume = (newVol: number) => {
    setVolumeState(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useSoundtrack() {
  return useContext(AudioContext);
}
