"use client";

import { Music, Pause } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MUSIC_SRC = "/music.mp3";
const DEFAULT_VOLUME = 0.6;

export function BackgroundMusic() {
  const reduceMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false);
  const resumeOnVisibleRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, []);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    let disposed = false;

    function tryPlayOnInteraction() {
      if (!disposed) {
        void playMusic();
      }
    }

    async function init() {
      if (reduceMotion) return;

      const started = await playMusic();
      if (disposed || started) return;

      document.addEventListener("click", tryPlayOnInteraction, { once: true });
      document.addEventListener("touchstart", tryPlayOnInteraction, {
        once: true,
      });
    }

    void init();

    return () => {
      disposed = true;
      document.removeEventListener("click", tryPlayOnInteraction);
      document.removeEventListener("touchstart", tryPlayOnInteraction);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [playMusic, reduceMotion]);

  useEffect(() => {
    function hidePage() {
      const audio = audioRef.current;
      if (!audio || audio.paused) {
        return;
      }

      resumeOnVisibleRef.current = !userPausedRef.current;
      pauseMusic();
    }

    function showPage() {
      if (document.hidden || userPausedRef.current || !resumeOnVisibleRef.current) {
        return;
      }

      resumeOnVisibleRef.current = false;
      void playMusic();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        hidePage();
        return;
      }

      showPage();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", hidePage);
    window.addEventListener("pageshow", showPage);
    window.addEventListener("freeze", hidePage);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", hidePage);
      window.removeEventListener("pageshow", showPage);
      window.removeEventListener("freeze", hidePage);
    };
  }, [pauseMusic, playMusic]);

  function handleToggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPausedRef.current = false;
      resumeOnVisibleRef.current = false;
      void playMusic();
      return;
    }

    userPausedRef.current = true;
    resumeOnVisibleRef.current = false;
    pauseMusic();
  }

  const label = isPlaying ? "Pausar música" : "Tocar música";

  return (
    <>
      <audio ref={audioRef} loop preload="metadata" src={MUSIC_SRC} />

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
          onClick={handleToggle}
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
