"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import type { TimelinePhoto } from "@/types/gallery";

type TimelineItemProps = {
  photo: TimelinePhoto;
  onOpen: () => void;
  align: "left" | "right";
};

export function TimelineItem({ photo, onOpen, align }: TimelineItemProps) {
  const reduceMotion = useReducedMotion();
  const isLeft = align === "left";

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: isLeft ? -16 : 16 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  return (
    <li className="relative grid grid-cols-2 items-center gap-3 py-3">
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent"
      />

      {isLeft ? (
        <>
          <motion.div className="justify-self-end" {...reveal}>
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
          <motion.div className="justify-self-start" {...reveal}>
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
        "polaroid-frame relative w-36 text-left",
        "motion-safe:transition-transform motion-safe:hover:-translate-y-0.5",
        tilt,
      )}
    >
      <span className="polaroid-photo relative block aspect-square overflow-hidden rounded-sm">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="144px"
          className="object-cover"
        />
      </span>
    </button>
  );
}
