"use client";

import { motion, useReducedMotion } from "motion/react";

import { invitationSectionClass } from "@/components/invitation/section-classes";
import { fadeUp } from "@/lib/motion";
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

  return (
    <section
      id="contagem"
      aria-labelledby="contagem-titulo"
      className={`${invitationSectionClass} z-10`}
    >
      <div className="mx-auto w-full max-w-md px-4 pt-10 sm:pt-12">
        <motion.div {...fadeUp(reduceMotion)}>
          <div className="relative overflow-visible rounded-lg bg-accent/10 px-3 pb-8 shadow-soft sm:px-4">
            <CountdownHeader event={event} />

            <div className="pt-20">
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
