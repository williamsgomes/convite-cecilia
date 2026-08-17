"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useRef, useState, type ReactNode } from "react";

import { EASE_OUT_SOFT } from "@/lib/motion";
import { useWheelPager } from "@/lib/use-wheel-pager";
import type { Message } from "@/types/message";

import { MessageCard } from "./MessageCard";
import {
  MessagesArrowNext,
  MessagesArrowPrev,
  MessagesNav,
} from "./MessagesNav";

type MessagesCarouselProps = {
  messages: Message[];
  highlightId?: string | null;
  leftDecor?: ReactNode;
  rightDecor?: ReactNode;
};

const SWIPE_THRESHOLD = 40;

export function MessagesCarousel({
  messages,
  highlightId = null,
  leftDecor,
  rightDecor,
}: MessagesCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const pointerStartX = useRef<number | null>(null);

  const count = messages.length;
  const current = messages[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      if (count === 0) return;

      const resolved = ((nextIndex % count) + count) % count;
      if (resolved === index) return;

      setDirection(nextIndex > index ? 1 : -1);
      setIndex(resolved);
    },
    [count, index],
  );

  const goPrevious = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const wheelRef = useWheelPager(goPrevious, goNext, count > 1);

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
    if (event.pointerType !== "mouse") {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
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

  function handlePointerCancel() {
    pointerStartX.current = null;
  }

  if (count === 0) {
    return (
      <p
        id="recadinhos-lista"
        role="status"
        className="text-center text-sm text-muted"
      >
        Os recadinhos ainda estão sendo preparados com carinho.
      </p>
    );
  }

  return (
    <div
      ref={wheelRef}
      id="recadinhos-lista"
      role="region"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="mt-5 scroll-mt-6 rounded-md outline-none"
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
            className="relative overflow-hidden touch-pan-y select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={current.id}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={{
                  enter: (slide: number) =>
                    reduceMotion
                      ? { opacity: 0 }
                      : { x: slide * 56, opacity: 0 },
                  center: { x: 0, opacity: 1 },
                  exit: (slide: number) =>
                    reduceMotion
                      ? { opacity: 0 }
                      : { x: slide * -56, opacity: 0 },
                }}
                transition={{
                  duration: reduceMotion ? 0.15 : 0.32,
                  ease: EASE_OUT_SOFT,
                }}
              >
                <MessageCard
                  message={current}
                  highlighted={current.id === highlightId}
                />
              </motion.div>
            </AnimatePresence>
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
