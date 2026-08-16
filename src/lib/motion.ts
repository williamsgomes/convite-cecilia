export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;

type FadeUpOptions = {
  delay?: number;
  amount?: number;
};

export function fadeUp(
  reduceMotion: boolean | null,
  delayOrOptions: number | FadeUpOptions = 0,
) {
  if (reduceMotion) {
    return {};
  }

  const delay =
    typeof delayOrOptions === "number"
      ? delayOrOptions
      : (delayOrOptions.delay ?? 0);
  const amount =
    typeof delayOrOptions === "number" ? 0.2 : (delayOrOptions.amount ?? 0.2);

  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: {
      duration: 0.6,
      delay,
      ease: EASE_OUT_SOFT,
    },
  };
}

export function slideIn(
  reduceMotion: boolean | null,
  direction: "left" | "right",
  delay = 0,
) {
  if (reduceMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, x: direction === "left" ? -16 : 16 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.15, margin: "80px 0px" },
    transition: {
      duration: 0.5,
      delay,
      ease: EASE_OUT_SOFT,
    },
  };
}
