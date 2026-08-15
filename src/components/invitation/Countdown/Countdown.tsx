"use client";

import { motion, useReducedMotion } from "motion/react";

import type { Event } from "@/types/event";

import { CountdownFooter } from "./CountdownFooter";
import { CountdownHeader } from "./CountdownHeader";
import { CountdownUnits } from "./CountdownUnits";
import { useCountdown } from "./use-countdown";

type CountdownProps = {
  event: Event;
};

export function Countdown({ event }: CountdownProps) {
  const reduceMotion = useReducedMotion();
  const { remaining, isEnded } = useCountdown({ eventDate: event.eventDate });

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
      id="contagem"
      aria-labelledby="contagem-titulo"
      className="relative scroll-mt-6 overflow-x-clip bg-surface"
    >
      <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-12">
        <motion.div {...fadeUp}>
          <div className="relative overflow-visible rounded-lg bg-accent/10 px-3 pb-4 shadow-soft sm:px-4">
            <CountdownHeader event={event} />

            <div className="pt-20 sm:pt-20">
              <CountdownUnits
                event={event}
                remaining={remaining}
                isEnded={isEnded}
              />
            </div>
          </div>

          <CountdownFooter />
        </motion.div>
      </div>
    </section>
  );
}
