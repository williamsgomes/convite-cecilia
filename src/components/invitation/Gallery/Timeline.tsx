"use client";

import type { TimelinePhoto } from "@/types/gallery";

import { TimelineItem } from "./TimelineItem";

type TimelineProps = {
  photos: TimelinePhoto[];
  onOpenPhoto: (index: number) => void;
};

export function Timeline({ photos, onOpenPhoto }: TimelineProps) {
  return (
    <div className="relative mt-6">
      <div
        aria-hidden
        className="absolute top-24 right-0 left-0 h-1 rounded-full bg-sage/50"
      />
      <ul
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Linha do tempo da Cecília"
      >
        {photos.map((photo, index) => (
          <TimelineItem
            key={photo.id}
            photo={photo}
            onOpen={() => onOpenPhoto(index)}
          />
        ))}
      </ul>
    </div>
  );
}
