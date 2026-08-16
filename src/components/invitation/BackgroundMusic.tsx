"use client";

import { Music, Pause } from "lucide-react";
import type { RefObject } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type BackgroundMusicProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
  autoPlay?: boolean;
  isPlaying: boolean;
  onToggle: () => void;
};

export function BackgroundMusic({
  audioRef,
  autoPlay = false,
  isPlaying,
  onToggle,
}: BackgroundMusicProps) {
  const label = isPlaying ? "Pausar música" : "Tocar música";

  return (
    <>
      <audio
        ref={audioRef}
        loop
        autoPlay={autoPlay}
        playsInline
        preload="auto"
        src="/music.mp3"
      />

      <div
        className={cn(
          "fixed right-4 bottom-4 z-40",
          "pr-[max(0px,env(safe-area-inset-right))]",
          "pb-[max(0px,env(safe-area-inset-bottom))]",
        )}
      >
        <Button
          type="button"
          variant="outline"
          aria-label={label}
          aria-pressed={isPlaying}
          data-music-toggle
          onClick={onToggle}
          className="size-11 min-h-0 shrink-0 rounded-full p-0 text-accent-strong shadow-lift"
        >
          <span className="flex size-11 items-center justify-center">
            {isPlaying ? (
              <Pause
                aria-hidden
                className="block size-5 shrink-0"
                strokeWidth={2}
              />
            ) : (
              <Music
                aria-hidden
                className="block size-5 shrink-0"
                strokeWidth={2}
              />
            )}
          </span>
        </Button>
      </div>
    </>
  );
}
