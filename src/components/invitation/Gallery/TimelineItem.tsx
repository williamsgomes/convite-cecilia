"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { slideIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { TimelinePhoto } from "@/types/gallery";

type TimelineItemProps = {
  photo: TimelinePhoto;
  onOpen: () => void;
  align: "left" | "right";
  delay?: number;
};

export function TimelineItem({
  photo,
  onOpen,
  align,
  delay = 0,
}: TimelineItemProps) {
  const reduceMotion = useReducedMotion();
  const isLeft = align === "left";
  const reveal = slideIn(reduceMotion, isLeft ? "left" : "right", delay);

  return (
    <li className="relative grid grid-cols-2 items-center gap-3 py-3">
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent"
      />

      {isLeft ? (
        <>
          <motion.div className="w-[min(9rem,100%)] justify-self-end" {...reveal}>
            <Polaroid photo={photo} onOpen={onOpen} tilt="-rotate-2" />
          </motion.div>
          <p className="pl-4 font-hand text-xl font-semibold text-primary">
            {photo.label}
          </p>
        </>
      ) : (
        <>
          <p className="pr-4 text-right font-hand text-xl font-semibold text-primary">
            {photo.label}
          </p>
          <motion.div className="w-[min(9rem,100%)] justify-self-start" {...reveal}>
            <Polaroid photo={photo} onOpen={onOpen} tilt="rotate-2" />
          </motion.div>
        </>
      )}
    </li>
  );
}

function Polaroid({
  photo,
  onOpen,
  tilt,
}: {
  photo: TimelinePhoto;
  onOpen: () => void;
  tilt: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar foto: ${photo.label}`}
      className={cn(
        "polaroid-frame polaroid-frame-tight relative w-full text-left",
        "motion-safe:transition-transform motion-safe:hover:-translate-y-0.5",
        tilt,
      )}
    >
      <span className="polaroid-photo relative block aspect-square overflow-hidden rounded-sm">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 320px) 42vw, 144px"
          className="object-cover"
        />
      </span>
    </button>
  );
}
