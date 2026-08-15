"use client";

import type { TimelinePhoto } from "@/types/gallery";

import { TimelineItem } from "./TimelineItem";

type TimelineProps = {
  photos: TimelinePhoto[];
  onOpenPhoto: (index: number) => void;
};

export function Timeline({ photos, onOpenPhoto }: TimelineProps) {
  return (
    <div className="relative mt-8 px-4">
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-sage/50"
      />
      <ol className="relative" aria-label="Linha do tempo da Cecília">
        {photos.map((photo, index) => (
          <TimelineItem
            key={photo.id}
            photo={photo}
            align={index % 2 === 0 ? "left" : "right"}
            onOpen={() => onOpenPhoto(index)}
          />
        ))}
      </ol>
    </div>
  );
}
