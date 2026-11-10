"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film } from "lucide-react";

interface RampwalkVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export function RampwalkVideoModal({
  isOpen,
  onClose,
  videoSrc = "/videos/rampwalk.mp4",
}: RampwalkVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hasFileError, setHasFileError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsPlaying(true);
      setHasFileError(false);
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const cycleSpeed = () => {
    const speeds = [1, 0.75, 0.5];
    const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in">
      {/* Top Bar Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-auto">
        <div className="flex items-center gap-3">
          <Film className="w-4 h-4 text-white" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
            RUNWAY BROADCAST · LIVE MOTION
          </span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-neutral-300">
            {playbackRate}x SPEED
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close runway video"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl flex items-center justify-center">
        {hasFileError ? (
          <div className="text-center p-8 max-w-md space-y-4">
            <Film className="w-12 h-12 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold font-mono uppercase text-white">
              Ready for Your Rampwalk Video
            </h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Drop your video file into the project directory as:
              <br />
              <code className="text-emerald-400 font-mono text-[11px] block mt-1.5 p-2 rounded bg-white/5 border border-white/10">
                public/videos/rampwalk.mp4
              </code>
            </p>
            <p className="text-[11px] font-mono text-neutral-500">
              The player will automatically stream your video in full HD with speed control.
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              onError={() => setHasFileError(true)}
              onClick={togglePlay}
              className="w-full h-full object-cover scale-[1.08] origin-center cursor-pointer"
            />
            {/* Watermark Concealment Gradient */}
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-black via-black/80 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Bottom Playback Overlay */}
        {!hasFileError && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1.5 hover:text-neutral-300 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 hover:text-neutral-300 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={cycleSpeed}
                className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono transition-colors cursor-pointer"
              >
                {playbackRate}x
              </button>
            </div>

            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
              300 GSM DRAPE IN KINETIC MOTION
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RampwalkVideoModal;
