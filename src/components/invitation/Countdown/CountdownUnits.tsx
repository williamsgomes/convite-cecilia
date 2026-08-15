import { CalendarHeart, Clock, Heart, Timer } from "lucide-react";

import { formatCountdownAriaLabel } from "@/lib/countdown";
import type { RemainingTime } from "@/lib/countdown";
import type { Event } from "@/types/event";

import { CountdownUnit } from "./CountdownUnit";

type CountdownUnitsProps = {
  event: Event;
  remaining: RemainingTime;
  isEnded: boolean;
};

const units = [
  { key: "days", label: "Dias", icon: CalendarHeart },
  { key: "hours", label: "Horas", icon: Clock },
  { key: "minutes", label: "Minutos", icon: Timer },
  { key: "seconds", label: "Segundos", icon: Heart },
] as const;

export function CountdownUnits({
  event,
  remaining,
  isEnded,
}: CountdownUnitsProps) {
  if (isEnded) {
    return (
      <div className="relative z-10 px-4 py-6 text-center">
        <p className="font-display text-3xl text-accent-strong sm:text-4xl">
          {event.countdownEndedTitle}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-primary sm:text-base">
          {event.countdownEndedMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      className="relative z-10 px-1 sm:px-2"
    >
      <p className="sr-only">{formatCountdownAriaLabel(remaining)}</p>

      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {units.map(({ key, label, icon }) => (
          <CountdownUnit
            key={key}
            value={remaining[key]}
            label={label}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
}
