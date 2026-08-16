"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { invitationInnerClass, invitationSectionClass } from "@/components/invitation/section-classes";
import { fadeUp } from "@/lib/motion";
import type { Event } from "@/types/event";

import { StoryComposition } from "./StoryComposition";
import { StoryContent } from "./StoryContent";

type StoryProps = {
  event: Event;
};

export function Story({ event }: StoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="historia"
      aria-labelledby="historia-titulo"
      className={`${invitationSectionClass} bg-surface`}
    >
      <div className={invitationInnerClass}>
        <motion.div {...fadeUp(reduceMotion, { amount: 0.25 })}>
          <StoryContent event={event} />
        </motion.div>

        <motion.div {...fadeUp(reduceMotion, { delay: 0.12, amount: 0.25 })}>
          <StoryComposition
            honoreeName={event.honoreeName}
            scrollTarget={sectionRef}
          />
        </motion.div>
      </div>
    </section>
  );
}
