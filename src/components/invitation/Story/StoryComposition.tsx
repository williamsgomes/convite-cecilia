"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import type { RefObject } from "react";

import { DecorImage } from "@/components/decorations/DecorImage";

type StoryCompositionProps = {
  honoreeName: string;
  scrollTarget: RefObject<HTMLElement | null>;
};

export function StoryComposition({
  honoreeName,
  scrollTarget,
}: StoryCompositionProps) {
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [28, -32]);
  const grassY = useTransform(scrollYProgress, [0, 1], [12, -16]);
  const cowY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const sheepY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const butterflyY = useTransform(scrollYProgress, [0, 1], [20, -24]);

  return (
    <div className="relative mt-8 overflow-visible px-0 pb-8 pt-2">
      <motion.div
        style={reduceMotion ? undefined : { y: butterflyY }}
        className="pointer-events-none absolute top-9 left-3 z-30 w-11 sm:top-8 sm:left-5 sm:w-12"
        aria-hidden
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="-scale-x-100"
        >
          <DecorImage
            src="/images/decorations/butterfly.webp"
            width={117}
            height={123}
            className="h-auto w-full"
          />
        </motion.div>
      </motion.div>

      <div className="translate-y-11 sm:translate-y-12">
        <motion.figure
          style={reduceMotion ? undefined : { y: photoY }}
          className="relative z-[1] mx-auto w-[54%] max-w-56 -rotate-1"
        >
          <Image
            src="/images/baby/cecilia-baby.webp"
            alt={`Foto da ${honoreeName}`}
            width={555}
            height={577}
            sizes="(max-width: 448px) 54vw, 224px"
            className="block h-auto w-full object-contain object-bottom"
          />
          <figcaption className="sr-only">{honoreeName}</figcaption>
        </motion.figure>
      </div>

      <div className="-mt-14 sm:-mt-16">
        <motion.div
          style={reduceMotion ? undefined : { y: grassY }}
          className="relative z-10"
        >
          <DecorImage
            src="/images/flowers/strip.webp"
            width={463}
            height={163}
            className="mx-auto h-auto w-[92%] max-w-sm opacity-90"
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex items-end justify-between px-1 sm:bottom-10">
        <motion.div
          style={reduceMotion ? undefined : { y: cowY }}
          className="w-[26%] max-w-32 shrink-0"
        >
          <motion.div
            animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }
            }
          >
            <DecorImage
              src="/images/animals/cow-sitting.webp"
              width={372}
              height={402}
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={reduceMotion ? undefined : { y: sheepY }}
          className="w-[24%] max-w-28 shrink-0"
        >
          <motion.div
            animate={reduceMotion ? undefined : { x: [0, -5, 0] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }
            }
          >
            <DecorImage
              src="/images/animals/sheep-sitting.webp"
              width={251}
              height={275}
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
