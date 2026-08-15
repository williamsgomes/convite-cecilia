"use client";

import { motion, useReducedMotion } from "motion/react";

import { DecorImage } from "@/components/decorations/DecorImage";
import { cn } from "@/lib/utils";

const decorClass = "pointer-events-none absolute select-none";

const butterflyPath = {
  x: [0, 22, -14, 28, -8, 18, 0],
  y: [0, -14, 8, -20, 12, -10, 0],
  rotate: [0, 6, -4, 8, -6, 3, 0],
};

const beePath = {
  x: [0, -18, 12, -24, 10, -6, 0],
  y: [0, 10, -8, 14, -12, 6, 0],
  rotate: [0, -5, 4, -6, 5, -3, 0],
};

export function HeroInsectDecor() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <DecorImage
          src="/images/decorations/butterfly.webp"
          width={117}
          height={123}
          className={cn(
            decorClass,
            "top-[12%] left-[66%] w-[13%] max-w-14 -translate-y-2",
          )}
        />
        <DecorImage
          src="/images/decorations/bee.webp"
          width={100}
          height={91}
          className={cn(
            decorClass,
            "top-[37%] left-[12%] w-[11%] max-w-12 translate-x-3",
          )}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className={cn(decorClass, "top-[10%] left-[64%] w-[13%] max-w-14 -translate-y-2")}>
        <motion.div
          animate={butterflyPath}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <DecorImage
            src="/images/decorations/butterfly.webp"
            width={117}
            height={123}
          />
        </motion.div>
      </div>

      <div className={cn(decorClass, "top-[35%] left-[10%] w-[11%] max-w-12 translate-x-3")}>
        <motion.div
          animate={beePath}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <DecorImage src="/images/decorations/bee.webp" width={100} height={91} />
        </motion.div>
      </div>
    </div>
  );
}

export function HeroBalloonDecor() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <DecorImage
        src="/images/decorations/balao.webp"
        width={90}
        height={258}
        aria-hidden
        className={cn(
          decorClass,
          "top-[18%] right-[8%] z-10 w-[10%] max-w-12",
        )}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className={cn(decorClass, "left-[68%] z-10 w-[10%] max-w-14")}
      initial={{ top: "58%", opacity: 0.9 }}
      animate={{ top: "0%", opacity: [0.9, 1, 1, 0] }}
      transition={{
        duration: 22,
        ease: [0.22, 0.61, 0.36, 1],
        times: [0, 0.2, 0.9, 1],
      }}
    >
      <DecorImage src="/images/decorations/balao.webp" width={90} height={258} />
    </motion.div>
  );
}
