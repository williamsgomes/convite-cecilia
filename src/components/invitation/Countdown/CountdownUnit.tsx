import { motion, useReducedMotion } from "motion/react";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";
import { padCountdownUnit } from "@/lib/countdown";

type CountdownUnitProps = {
  value: number;
  label: string;
  icon: ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean;
  }>;
  className?: string;
};

export function CountdownUnit({
  value,
  label,
  icon: Icon,
  className,
}: CountdownUnitProps) {
  const reduceMotion = useReducedMotion();
  const displayValue = value >= 100 ? String(value) : padCountdownUnit(value);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center gap-1.5 rounded-lg border border-dashed border-accent/35 bg-surface-raised px-1 py-2.5 shadow-soft sm:gap-2 sm:px-2 sm:py-3",
        className,
      )}
    >
      {reduceMotion ? (
        <span className="min-w-[2ch] text-center text-xl font-extrabold tabular-nums text-accent-strong sm:text-2xl">
          {displayValue}
        </span>
      ) : (
        <motion.span
          key={displayValue}
          initial={{ opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="min-w-[2ch] text-center text-xl font-extrabold tabular-nums text-accent-strong sm:text-2xl"
        >
          {displayValue}
        </motion.span>
      )}

      <span className="text-[0.55rem] font-extrabold tracking-[0.12em] text-muted uppercase sm:text-[0.6rem]">
        {label}
      </span>

      <span className="flex size-7 items-center justify-center rounded-full bg-accent/15 text-accent-strong sm:size-8">
        <Icon aria-hidden className="size-3.5" strokeWidth={1.75} />
      </span>
    </div>
  );
}
