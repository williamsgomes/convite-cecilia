"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";

import type { GalleryPhoto } from "@/types/gallery";

type GalleryExtraModalProps = {
  title: string;
  photos: GalleryPhoto[];
  onClose: () => void;
  onOpenPhoto: (index: number) => void;
  suppressEscape?: boolean;
};

export function GalleryExtraModal({
  title,
  photos,
  onClose,
  onOpenPhoto,
  suppressEscape = false,
}: GalleryExtraModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (suppressEscape) {
        return;
      }

      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, suppressEscape]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Fechar galeria"
        className="absolute inset-0 bg-primary/40"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[85vh] w-full max-w-md flex-col rounded-lg bg-surface-raised p-5 shadow-lift sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 id={titleId} className="text-lg font-extrabold text-primary">
            {title}
          </h3>
          <button
            ref={closeRef}
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-sunken"
          >
            <X aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-3 overflow-y-auto pr-1">
          {photos.map((photo, index) => (
            <li key={photo.id}>
              <button
                type="button"
                onClick={() => onOpenPhoto(index)}
                aria-label={`Ampliar ${photo.caption ?? photo.alt}`}
                className="polaroid-frame w-full text-left"
              >
                <span className="polaroid-photo relative block aspect-square overflow-hidden rounded-sm">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 448px) 40vw, 180px"
                    className="object-cover"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
