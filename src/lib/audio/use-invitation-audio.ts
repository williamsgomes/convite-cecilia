"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_VOLUME = 0.6;
const UNLOCK_EVENTS = ["pointerdown", "touchstart", "click", "keydown"] as const;

type UseInvitationAudioOptions = {
  autoplay?: boolean;
};

export function useInvitationAudio({
  autoplay = false,
}: UseInvitationAudioOptions = {}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false);
  const hasStartedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) {
      return false;
    }

    try {
      audio.muted = false;
      audio.volume = volume;
      await audio.play();
      hasStartedRef.current = true;
      setIsPlaying(true);
      setHasFailed(false);
      setIsAvailable(true);
      return true;
    } catch {
      setIsPlaying(false);
      setHasFailed(true);
      return false;
    }
  }, [volume]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      userPausedRef.current = false;
      void play();
      return;
    }

    userPausedRef.current = true;
    pause();
  }, [pause, play]);

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.min(1, Math.max(0, nextVolume));
    setVolumeState(clamped);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = clamped;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = volume;
    audio.muted = false;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setIsAvailable(false);
      setHasFailed(true);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    let disposed = false;

    async function tryStart() {
      if (disposed || userPausedRef.current || document.hidden) {
        return false;
      }

      return play();
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
        document.addEventListener(eventName, onUnlock, { capture: true });
      }
    }

    function removeUnlockListeners() {
      for (const eventName of UNLOCK_EVENTS) {
        document.removeEventListener(eventName, onUnlock, { capture: true });
      }
    }

    function hidePage() {
      if (!audioRef.current || audioRef.current.paused) {
        return;
      }

      pause();
    }

    function showPage() {
      if (!autoplay && !hasStartedRef.current) {
        return;
      }

      void tryStart();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        hidePage();
        return;
      }

      showPage();
    }

    if (autoplay) {
      void tryStart().then((started) => {
        if (!started && !disposed) {
          addUnlockListeners();
        }
      });
      audio.addEventListener("canplay", showPage);
    }

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
      audio.removeEventListener("error", onError);
      audio.removeEventListener("canplay", showPage);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", hidePage);
      window.removeEventListener("pageshow", showPage);
      window.removeEventListener("focus", showPage);
      window.removeEventListener("freeze", hidePage);
    };
  }, [autoplay, pause, play, volume]);

  return {
    audioRef,
    isPlaying,
    isAvailable,
    hasFailed,
    volume,
    play,
    pause,
    toggle,
    setVolume,
  };
}
