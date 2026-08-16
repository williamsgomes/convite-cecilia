"use client";

import { useEffect, useRef, type RefObject } from "react";

const WHEEL_THRESHOLD = 10;
const WHEEL_LOCK_MS = 280;

export function useWheelPager(
  onPrevious: () => void,
  onNext: () => void,
  enabled = true,
  targetRef?: RefObject<HTMLElement | null>,
) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const nodeRef = targetRef ?? fallbackRef;
  const onPreviousRef = useRef(onPrevious);
  const onNextRef = useRef(onNext);
  const lockedRef = useRef(false);

  onPreviousRef.current = onPrevious;
  onNextRef.current = onNext;

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !enabled) {
      return;
    }

    function onWheel(event: WheelEvent) {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (Math.abs(delta) < WHEEL_THRESHOLD) {
        return;
      }

      event.preventDefault();

      if (lockedRef.current) {
        return;
      }

      lockedRef.current = true;

      if (delta > 0) {
        onNextRef.current();
      } else {
        onPreviousRef.current();
      }

      window.setTimeout(() => {
        lockedRef.current = false;
      }, WHEEL_LOCK_MS);
    }

    node.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      node.removeEventListener("wheel", onWheel);
    };
  }, [enabled, nodeRef]);

  return fallbackRef;
}
