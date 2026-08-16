"use client";

import { Music, Pause } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MUSIC_SRC = "/music.mp3";
const DEFAULT_VOLUME = 0.6;
const UNLOCK_EVENTS = ["pointerdown", "touchstart", "click", "keydown"] as const;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return false;

    try {
      audio.muted = false;
      audio.volume = DEFAULT_VOLUME;
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
    audio.muted = false;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    let disposed = false;

    async function tryStart() {
      if (disposed || userPausedRef.current || document.hidden) {
        return false;
      }

      return playMusic();
    }

    function onUnlock(event: Event) {
      if (
        event.target instanceof Element &&
        event.target.closest("[data-music-toggle]")
      ) {
        return;
      }

      void tryStart().then((started) => {
        if (started) {
          removeUnlockListeners();
        }
      });
    }

    function addUnlockListeners() {
      for (const eventName of UNLOCK_EVENTS) {
        document.addEventListener(eventName, onUnlock, {
          capture: true,
        });
      }
    }

    function removeUnlockListeners() {
      for (const eventName of UNLOCK_EVENTS) {
        document.removeEventListener(eventName, onUnlock, {
          capture: true,
        });
      }
    }

    function hidePage() {
      if (!audioRef.current || audioRef.current.paused) {
        return;
      }

      pauseMusic();
    }

    function showPage() {
      void tryStart();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        hidePage();
        return;
      }

      showPage();
    }

    void tryStart().then((started) => {
      if (!started && !disposed) {
        addUnlockListeners();
      }
    });

    audio.addEventListener("canplay", showPage);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", hidePage);
    window.addEventListener("pageshow", showPage);
    window.addEventListener("focus", showPage);
    window.addEventListener("freeze", hidePage);

    return () => {
      disposed = true;
      removeUnlockListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", showPage);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", hidePage);
      window.removeEventListener("pageshow", showPage);
      window.removeEventListener("focus", showPage);
      window.removeEventListener("freeze", hidePage);
    };
  }, [pauseMusic, playMusic]);

  function handleToggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPausedRef.current = false;
      void playMusic();
      return;
    }

    userPausedRef.current = true;
    pauseMusic();
  }

  const label = isPlaying ? "Pausar música" : "Tocar música";

  return (
    <>
      <audio
        ref={audioRef}
        loop
        autoPlay
        playsInline
        preload="auto"
        src={MUSIC_SRC}
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
