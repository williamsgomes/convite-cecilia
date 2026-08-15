"use client";

import { motion, useReducedMotion } from "motion/react";

import { DecorImage } from "@/components/decorations/DecorImage";
import { Heading } from "@/components/ui/Heading";
import type { Event } from "@/types/event";

import { LocationCard } from "./LocationCard";
import { LocationMap } from "./LocationMap";

type LocationProps = {
  event: Event;
};

export function Location({ event }: LocationProps) {
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
      id="localizacao"
      aria-labelledby="localizacao-titulo"
      className="relative scroll-mt-6 overflow-x-clip bg-surface"
    >
      <div className="mx-auto w-full max-w-md px-4 pt-14 pb-4 sm:pt-16">
        <motion.div {...fadeUp}>
          <div className="text-center">
            <Heading
              level={2}
              hand
              id="localizacao-titulo"
              className="text-[2.15rem] leading-tight sm:text-5xl"
            >
              {event.locationTitle}
            </Heading>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {event.locationIntro}
            </p>
          </div>

          <div className="relative mt-6">
            <div className="px-12">
              <LocationMap
                mapsUrl={event.mapsUrl}
                title={`Mapa de ${event.locationName}`}
              />
            </div>
            <div className="pointer-events-none absolute bottom-1 left-0 z-10 h-[4.5rem] w-16 overflow-hidden">
              <DecorImage
                src="/images/animals/bunny.webp"
                width={247}
                height={257}
                className="!w-16 max-w-none -translate-y-1.5"
              />
            </div>
          </div>

          <LocationCard event={event} />
        </motion.div>
      </div>
    </section>
  );
}
