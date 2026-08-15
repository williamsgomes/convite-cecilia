import { CalendarHeart, Clock, Heart, MapPin } from "lucide-react";
import type { ComponentType } from "react";

import { Card } from "@/components/ui/Card";
import { formatEventDetails } from "@/lib/format-event";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/event";

type HeroDetailsProps = {
  event: Event;
};

type IconType = ComponentType<{
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}>;

type CellProps = {
  icon: IconType;
  label: string;
  primary: string;
  secondary: string;
  className?: string;
};

function Cell({ icon: Icon, label, primary, secondary, className }: CellProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center gap-2 px-2 text-center",
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
      </span>
      <dt className="text-[0.7rem] font-extrabold tracking-[0.12em] text-accent-strong uppercase">
        {label}
      </dt>
      <dd className="text-sm font-extrabold text-primary sm:text-base">
        {primary}
        <span className="mt-0.5 block text-xs font-medium text-muted">
          {secondary}
        </span>
      </dd>
    </div>
  );
}

export function HeroDetails({ event }: HeroDetailsProps) {
  const details = formatEventDetails(event);

  return (
    <Card
      id="convite-detalhes"
      className="scroll-mt-6 rounded-lg px-3 py-6 shadow-lift sm:px-4 sm:py-7"
    >
      <dl className="grid grid-cols-3">
        <Cell
          icon={CalendarHeart}
          label="Data"
          primary={details.dateLabel}
          secondary={details.weekday}
        />
        <Cell
          icon={Clock}
          label="Horário"
          primary={details.timeLabel}
          secondary={details.timeHint}
          className="border-x border-dashed border-accent/40"
        />
        <Cell
          icon={MapPin}
          label="Local"
          primary={details.placeName}
          secondary={details.placeKind}
        />
      </dl>

      <p className="mt-5 flex items-center justify-center gap-2 text-sage-strong">
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
