"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { GinghamBar } from "@/components/decorations/GinghamBar";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/event";

import { HeroDecor } from "./HeroDecor";
import { HeroDetails } from "./HeroDetails";
import { HeroPlaque } from "./HeroPlaque";

type HeroProps = {
  event: Event;
};

const frameClass = "mx-auto w-full max-w-md px-4";

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
      className="relative overflow-x-clip"
    >
      <h1 id="titulo-convite" className="sr-only">
        {event.honoreeName}, {event.age} aninho
      </h1>

      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-surface/20" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-surface to-transparent" />
        </div>

        <div className={cn(frameClass, "relative z-10 pt-12 pb-8")}>
          <div className="absolute top-3 right-4 z-30 w-[4.5rem] sm:w-20">
            <HeroDecor />
          </div>

          <motion.div
            className="flex flex-col items-center"
            {...fadeUp(0.08)}
          >
            <Image
              src="/images/baby/cecilia-baby.webp"
              alt="Cecília, aniversariante, apontando para cima"
              width={555}
              height={577}
              priority
              sizes="14rem"
              className="relative z-10 -mb-4 h-auto w-52 sm:-mb-6 sm:w-56"
            />
            <HeroPlaque />
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 -mt-1 bg-surface pb-8">
        <div className={frameClass}>
          <motion.div {...fadeUp(0.28)}>
            <HeroDetails event={event} />
          </motion.div>
        </div>
      </div>

      <GinghamBar />
    </section>
  );
}
