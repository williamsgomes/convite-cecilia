"use client";

import { useEffect, useState } from "react";

import {
  getRemainingTime,
  type RemainingTime,
} from "@/lib/countdown";

type UseCountdownOptions = {
  eventDate: string;
};

export function useCountdown({ eventDate }: UseCountdownOptions) {
  const [remaining, setRemaining] = useState<RemainingTime | null>(null);

  useEffect(() => {
    const targetDate = new Date(eventDate);

    function tick() {
      setRemaining(getRemainingTime(targetDate));
    }

    tick();

    const intervalId = window.setInterval(tick, 1000);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        tick();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [eventDate]);

  return {
    remaining,
    isEnded: remaining !== null && remaining.totalMs <= 0,
  };
}
