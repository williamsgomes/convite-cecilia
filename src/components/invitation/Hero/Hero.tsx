"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { GinghamBar } from "@/components/decorations/GinghamBar";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/event";

import { HeroBalloonDecor, HeroInsectDecor } from "./HeroFloatingDecor";
import { HeroDetails } from "./HeroDetails";

type HeroProps = {
  event: Event;
};

const contentFrameClass = "mx-auto w-full max-w-md px-4";

export function Hero({ event }: HeroProps) {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section
      aria-labelledby="titulo-convite"
      className="relative w-full overflow-visible bg-surface-header"
    >
      <h1 id="titulo-convite" className="sr-only">
        {event.honoreeName}, {event.age} aninho
      </h1>

      <div className="relative w-full">
        <Image
          src="/images/backgrounds/header-pronto.webp"
          alt="Cecília, convite de 1 aninho na fazendinha"
          width={900}
          height={839}
          priority
          sizes="100vw"
          className="block h-auto w-full max-w-none"
        />
        <HeroInsectDecor />
      </div>

      <HeroBalloonDecor />

      <div className={cn(contentFrameClass, "relative pb-8 pt-8")}>
        <motion.div {...fadeUp(0.2)}>
          <HeroDetails event={event} />
        </motion.div>
      </div>

      <GinghamBar />
    </section>
  );
}
