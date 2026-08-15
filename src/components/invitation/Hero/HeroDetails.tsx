import { CalendarHeart, Clock, Heart, MapPin } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { formatEventDetails } from "@/lib/format-event";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/event";

type HeroDetailsProps = {
  event: Event;
};

const cellClass = "flex min-w-0 flex-col items-center gap-1 px-1 text-center";

export function HeroDetails({ event }: HeroDetailsProps) {
  const details = formatEventDetails(event);

  return (
    <Card
      id="convite-detalhes"
      className="scroll-mt-6 px-3 py-5 shadow-lift sm:px-4 sm:py-6"
    >
      <dl className="grid grid-cols-3">
        <div className={cellClass}>
          <CalendarHeart
            aria-hidden
            className="size-5 text-accent-strong sm:size-6"
            strokeWidth={1.75}
          />
          <dt className="text-xs font-extrabold tracking-wide text-accent-strong uppercase">
            Data
          </dt>
          <dd className="text-sm font-extrabold text-primary sm:text-base">
            {details.dateLabel}
            <span className="mt-0.5 block text-xs font-semibold text-muted">
              {details.weekday}
            </span>
          </dd>
        </div>

        <div
          className={cn(
            cellClass,
            "border-x border-dashed border-accent/40",
          )}
        >
          <Clock
            aria-hidden
            className="size-5 text-accent-strong sm:size-6"
            strokeWidth={1.75}
          />
          <dt className="text-xs font-extrabold tracking-wide text-accent-strong uppercase">
            Horário
          </dt>
          <dd className="text-sm font-extrabold text-primary sm:text-base">
            {details.timeLabel}
            <span className="mt-0.5 block text-xs font-semibold text-muted">
              {details.timeHint}
            </span>
          </dd>
        </div>

        <div className={cellClass}>
          <MapPin
            aria-hidden
            className="size-5 text-accent-strong sm:size-6"
            strokeWidth={1.75}
          />
          <dt className="text-xs font-extrabold tracking-wide text-accent-strong uppercase">
            Local
          </dt>
          <dd className="text-xs font-semibold text-muted sm:text-sm">
            {details.placeKind}
            <span className="mt-0.5 block text-sm font-extrabold text-primary sm:text-base">
              {details.placeName}
            </span>
          </dd>
        </div>
      </dl>

      <p className="mt-4 flex items-center justify-center gap-2 text-sage-strong">
        <Sprig />
        <Heart
          aria-hidden
          className="size-3 fill-accent text-accent"
          strokeWidth={1.5}
        />
        <Sprig className="-scale-x-100" />
        <span className="sr-only">Detalhes da festa da Cecília</span>
      </p>
    </Card>
  );
}

function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 12" aria-hidden className={cn("h-3 w-8", className)}>
      <path
        fill="currentColor"
        d="M2 9c5-1 8-7 14-7-3 3-2 6-7 7 5 0 8-3 12-3-2 3-4 5-9 5-5 0-8-1-10-2z"
      />
    </svg>
  );
}
