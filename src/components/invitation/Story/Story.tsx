"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { GinghamBar } from "@/components/decorations/GinghamBar";
import type { Event } from "@/types/event";

import { StoryComposition } from "./StoryComposition";
import { StoryContent } from "./StoryContent";

type StoryProps = {
  event: Event;
};

export function Story({ event }: StoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section
      ref={sectionRef}
      id="historia"
      aria-labelledby="historia-titulo"
      className="relative scroll-mt-6 overflow-x-clip bg-surface"
    >
      <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-12">
        <motion.div {...fadeUp(0)}>
          <StoryContent event={event} />
        </motion.div>

        <motion.div {...fadeUp(0.12)}>
          <StoryComposition
            honoreeName={event.honoreeName}
            scrollTarget={sectionRef}
          />
        </motion.div>
      </div>

      <GinghamBar />
    </section>
  );
}
