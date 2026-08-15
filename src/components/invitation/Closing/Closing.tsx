"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { DecorImage } from "@/components/decorations/DecorImage";
import type { Event } from "@/types/event";

type ClosingProps = {
  event: Event;
};

export function Closing({ event }: ClosingProps) {
  const reduceMotion = useReducedMotion();

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

  return (
    <section
      id="encerramento"
      aria-labelledby="encerramento-titulo"
      className="relative bg-surface"
    >
      <div className="mx-auto w-full max-w-md px-4 pt-8">
        <motion.div className="text-center" {...fadeUp}>
          <div className="rounded-lg border border-dashed border-accent/50 px-5 py-5">
            <p id="encerramento-titulo" className="sr-only">
              {event.closingLine1} {event.closingLine2}
            </p>
            <p className="flex items-center justify-center gap-2 font-semibold text-primary">
              <Heart
                aria-hidden
                className="size-4 fill-accent text-accent"
                strokeWidth={1.5}
              />
              {event.closingLine1}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {event.closingLine2}
            </p>
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none relative left-1/2 mt-8 w-screen max-w-none -translate-x-1/2"
      >
        <DecorImage
          src="/images/farm/fence-gate.webp"
          width={1217}
          height={307}
          className="relative block h-auto w-full max-w-none"
        />
      </div>
    </section>
  );
}
