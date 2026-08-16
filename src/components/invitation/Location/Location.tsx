"use client";

import { motion, useReducedMotion } from "motion/react";

import { DecorImage } from "@/components/decorations/DecorImage";
import { invitationSectionClass } from "@/components/invitation/section-classes";
import { Heading } from "@/components/ui/Heading";
import { fadeUp } from "@/lib/motion";
import type { Event } from "@/types/event";

import { LocationCard } from "./LocationCard";
import { LocationMap } from "./LocationMap";

type LocationProps = {
  event: Event;
};

export function Location({ event }: LocationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-titulo"
      className={`${invitationSectionClass} bg-surface`}
    >
      <div className="mx-auto w-full max-w-md px-4 pt-10 pb-6 sm:pt-12">
        <motion.div {...fadeUp(reduceMotion)}>
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
