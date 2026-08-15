"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useRef, useState, type ReactNode } from "react";

import type { Message } from "@/types/message";

import { MessageCard } from "./MessageCard";
import {
  MessagesArrowNext,
  MessagesArrowPrev,
  MessagesNav,
} from "./MessagesNav";

type MessagesCarouselProps = {
  messages: Message[];
  leftDecor?: ReactNode;
  rightDecor?: ReactNode;
};

const SWIPE_THRESHOLD = 40;

export function MessagesCarousel({
  messages,
  leftDecor,
  rightDecor,
}: MessagesCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  const count = messages.length;
  const current = messages[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      if (count === 0) return;
      setIndex(((nextIndex % count) + count) % count);
    },
    [count],
  );

  const goPrevious = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    pointerStartX.current = event.clientX;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return;

    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (delta > SWIPE_THRESHOLD) {
      goPrevious();
    }

    if (delta < -SWIPE_THRESHOLD) {
      goNext();
    }
  }

  if (count === 0) {
    return (
      <p role="status" className="text-center text-sm text-muted">
        Os recadinhos ainda estão sendo preparados com carinho.
      </p>
    );
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="mt-5 outline-none"
      aria-roledescription="carrossel"
      aria-label="Recadinhos"
    >
      <div className="flex items-center gap-2">
        <MessagesArrowPrev onClick={goPrevious} />

        <div className="relative min-w-0 flex-1">
          {leftDecor ? (
            <div className="pointer-events-none absolute -left-10 bottom-1 z-10">
              {leftDecor}
            </div>
          ) : null}
          {rightDecor ? (
            <div className="pointer-events-none absolute -right-10 bottom-1 z-10">
              {rightDecor}
            </div>
          ) : null}

          <div
            aria-live="polite"
            aria-atomic="true"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <div className={reduceMotion ? undefined : "transition-opacity duration-200"}>
              <MessageCard key={current.id} message={current} />
            </div>
          </div>
        </div>

        <MessagesArrowNext onClick={goNext} />
      </div>

      <MessagesNav
        count={count}
        currentIndex={index}
        onGoTo={goTo}
      />
    </div>
  );
}
