"use client";

import Image from "next/image";

import type { TimelinePhoto } from "@/types/gallery";

type TimelineItemProps = {
  photo: TimelinePhoto;
  onOpen: () => void;
};

export function TimelineItem({ photo, onOpen }: TimelineItemProps) {
  return (
    <li className="w-40 shrink-0 snap-start">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ampliar foto: ${photo.label}`}
        className="polaroid-frame relative w-full text-left motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
      >
        <span className="polaroid-photo relative block aspect-square overflow-hidden rounded-sm">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="160px"
            className="object-cover"
          />
        </span>
        <span className="absolute inset-x-0 bottom-2 text-center text-sm font-extrabold text-primary">
          {photo.label}
        </span>
      </button>
    </li>
  );
}
