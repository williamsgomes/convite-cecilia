"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useId, useRef } from "react";

import { useDialogFocus } from "@/lib/a11y/use-dialog-focus";
import { useWheelPager } from "@/lib/use-wheel-pager";
import { cn } from "@/lib/utils";
import type { LightboxPhoto } from "@/types/gallery";

type PhotoLightboxProps = {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  onGoTo: (index: number) => void;
  reduceMotion?: boolean;
};

const SWIPE_THRESHOLD = 40;

export function PhotoLightbox({
  photos,
  index,
  onClose,
  onGoTo,
  reduceMotion = false,
}: PhotoLightboxProps) {
  const titleId = useId();
  const pointerStartX = useRef<number | null>(null);
  const indexRef = useRef(index);
  const onGoToRef = useRef(onGoTo);
  const photo = photos[index];
  const count = photos.length;

  indexRef.current = index;
  onGoToRef.current = onGoTo;

  const goPrevious = useCallback(() => {
    onGoToRef.current(((indexRef.current - 1) % count + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    onGoToRef.current(((indexRef.current + 1) % count + count) % count);
  }, [count]);

  const { panelRef, closeRef } = useDialogFocus(true, onClose, {
    onKeyDown(event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
  });

  useWheelPager(goPrevious, goNext, count > 1, panelRef);

  if (!photo) {
    return null;
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
      onGoTo(((index - 1) % count + count) % count);
    }

    if (delta < -SWIPE_THRESHOLD) {
      onGoTo(((index + 1) % count + count) % count);
    }
  }

  function handlePointerCancel() {
    pointerStartX.current = null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar foto"
        className="absolute inset-0 bg-primary/70"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex w-full max-w-md flex-col gap-3"
      >
        <div className="flex items-center justify-between gap-3 text-accent-foreground">
          <p id={titleId} className="text-sm font-extrabold">
            {photo.caption ?? photo.alt}
          </p>
          <button
            ref={closeRef}
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-raised text-primary"
          >
            <X aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        <div
          className="relative touch-pan-y select-none overflow-hidden rounded-lg bg-surface-raised p-2 shadow-lift"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div
            className={cn(
              "relative aspect-square w-full overflow-hidden rounded-md",
              reduceMotion ? undefined : "transition-opacity duration-200",
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 448px) 90vw, 448px"
              className="pointer-events-none object-cover"
              draggable={false}
            />
          </div>
        </div>

        {count > 1 ? (
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={goPrevious}
              className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground"
            >
              <ChevronLeft aria-hidden className="size-5" strokeWidth={2} />
            </button>
            <p className="text-sm font-semibold text-accent-foreground">
              {index + 1} / {count}
            </p>
            <button
              type="button"
              aria-label="Próxima foto"
              onClick={goNext}
              className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground"
            >
              <ChevronRight aria-hidden className="size-5" strokeWidth={2} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
